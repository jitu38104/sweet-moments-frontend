import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sweet-moments-app.herokuapp.com/api'
});

export default instance;