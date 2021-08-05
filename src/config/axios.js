import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://damp-beyond-66324.herokuapp.com/api'
    //baseURL: 'http://localhost:5000/api'
});

export default instance;