import axios from 'axios';

const BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('API_URL or NEXT_PUBLIC_API_URL is not defined');
}

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
