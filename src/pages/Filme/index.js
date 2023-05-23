import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import api from "../../services/api";
import './filme-info.css';
import {toast} from 'react-toastify';



function Filme() {

    //pegando o parametro definido nas rotas(<Route path="/filme/:id" element={<Filme />} />) usando o useParams
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    //passa o id para o useEffect fazer uma chamada pelo ID
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "6e33025d26226965852c36f5fcce3060",
                    language: "pt-BR",
                }
            })

                //Quando o filme é encontrado pelo ID na api, passa para o useStateFilme que estava um objeto vazio e agora recebe o response.data que é onde estão os detalhes dos filmes (no data).
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    //usando navigate para redirecionar um filme que não foi encontrado/não existe de volta para a pag home, usando o replace: true.                    console.log("FILME NÃO ENCONTRADO ")
                    navigate("/", { replace: true });
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id])

    function salvarFilme() {
        //construção da chave do localStorage
        const minhaLista = localStorage.getItem("@primeflix");

        //verificando se a lista existe, se não existir iniciar um array vazio se tiver vai ficar dentro da variavel filmesSalvos.
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //VERIFICANDO SE NA LISTA TEM ALGUM FILME COM O MESMO ID JÁ SALVO, USANDO O METODO SOME
        // A FUNÇÃO ANONIMA NESSA LINHA DE CODIGO ABAIXO SERVE PARA FAZER A COMPARAÇÃO SE EXISTE FILME SALVO COM O ID.
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn("Esse filme já está na sua lista")
            return;

        }

        //SALVANDO E ADICIONANDO USANDO PUSH O FILME NA LISTA DE filmesSalvos
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso")


    }


    //criando loading para carregar antes dos detalhes aparecerem na pagina.
    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong> Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>

                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>

    )
}

export default Filme;