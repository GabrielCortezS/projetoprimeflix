import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import "./home.css";
///movie/now_playing?api_key=6e33025d26226965852c36f5fcce3060&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    //Sempre que abrir aplicação carregar o que tem no useEffect
    useEffect(() => {

        //função assíncrona para fazer busca na requisição da api
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "6e33025d26226965852c36f5fcce3060",
                    language: "pt-BR",
                    page: 1,
                }
            })
            //entrando no response, e se aprofundando no que a api oferece, results é onde estão os filmes
            //slice para reduzir o numero de filmes que aparecem, eram 20 e agora são 10
            //console.log(response.data.results.slice(0,10));

            setFilmes(response.data.results.slice(0, 12))
            setLoading(false);
        }

        loadFilmes();


    }, [])


    //criando loading para carregar antes dos filmes aparecerem na pagina.
    // chamando ele no setLoading mudando para falso sendo que foi criado no useState como true
    

    if (loading){
        return (
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}

            </div>

        </div>

    )
}

export default Home;