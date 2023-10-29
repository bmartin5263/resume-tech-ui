import axios from 'axios';

export const axiosClient = axios.create({
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

axios.defaults.withCredentials = true
const appClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

export default appClient;