import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-a78d9.firebaseio.com'
});

export default instance;