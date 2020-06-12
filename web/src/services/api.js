import axios from 'axios';

export const IBGE_STATE_API = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;