import axios from 'axios';

export default axios.create({
    baseURL: 'https://fakestoreapi.com',
    // timeout: 2000,
    headers: { 'Content-Type': 'application/JSON' }
});
