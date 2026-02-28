import axios, { AxiosError } from 'axios';
export type ApiError = AxiosError<{ error: string }>;
const baseURL = 'https://project-travelers8-back.onrender.com';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
