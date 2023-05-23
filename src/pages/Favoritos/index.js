import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

function Favoritos() {


    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        //converter uma string JSON em um objeto JavaScript.
        const minhaLista = localStorage.getItem("@primeflix");
        //Depois que a string JSON é convertida em objeto JavaScript, o objeto resultante é passado como parâmetro para a função setFilmes()
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    //passando o id dentro do onclick para que ele identique qual deve excluir.
    //A função excluirFilme(id) é usada para remover um filme de uma lista de filmes em um aplicativo React. O parâmetro id é o ID do filme a ser excluído.
    //A primeira linha da função cria uma nova variável chamada filtroFilmes que contém uma nova lista de filmes que é filtrada a partir da lista original de filmes, excluindo o filme com o ID especificado. A função filter() é usada para criar uma nova lista de filmes que atendem a uma determinada condição. Nesse caso, a condição é que o ID do filme seja diferente do ID passado como parâmetro.
    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmes(filtroFilmes);
        //salvando depois de fazer um filtro após a exclusão de um filme
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso!")
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo &#128557;</span>}

            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default Favoritos