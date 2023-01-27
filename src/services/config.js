import axios from 'axios';

export default axios.create({
    baseURL: 'https://fakestoreapi.com/users',
    timeout: 1000,
    headers: { 'Content-Type': 'application/JSON' }
});
