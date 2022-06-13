import axios from 'axios';
import { baseURLBackend } from './baseUrl';

export const hostApi = axios.create({
  baseURL: baseURLBackend,
});
