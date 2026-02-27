import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://project-travelers8-back.onrender.com',
  withCredentials: true,
});
