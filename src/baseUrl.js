import { create } from 'apisauce';

// baseURL: 'http://localhost:3333/api'

const api = create({
    baseURL: 'https://pontoparse.herokuapp.com/api'
    //baseURL: 'http://localhost:3333/api'
});

export default api;
