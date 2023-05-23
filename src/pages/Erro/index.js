import { Link } from "react-router-dom";
import './erro.css';

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encotrada</h2>
            <Link to="/">Veja todos os Filmes!</Link>
        </div>
    )

}

export default Erro;