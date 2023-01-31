import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:4000/',
    // baseURL: 'http://fakestoreapi.com/',
    // timeout: 2000,
    headers: { 'Content-Type': 'application/JSON' }
});
