import axios from 'axios';

export const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3333';

export const instance = axios.create({});
