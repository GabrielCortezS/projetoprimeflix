import axios from "axios";

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=6e33025d26226965852c36f5fcce3060&language=pt-BR



const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'

});

export default api;
