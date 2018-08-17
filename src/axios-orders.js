import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-d20f3.firebaseio.com/'
});

export default instance;