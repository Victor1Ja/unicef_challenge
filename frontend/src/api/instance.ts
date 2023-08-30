import axios from 'axios';

export const baseUrl = process.env.REACT_APP_API_URL;

export const instance = axios.create({});
