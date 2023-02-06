import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:4000/',
    // baseURL: 'https://mockend.com/mockend/demo/posts',
    // baseURL: 'https://ramchat007.github.io/formik-form-api/',
    // timeout: 2000,
    headers: { 'Content-Type': 'application/JSON' }
});
