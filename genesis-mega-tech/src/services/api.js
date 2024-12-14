import axios from 'axios';

// Base URL for the main API
const BASE_URL = 'https://genesisback-39365de31ea7.herokuapp.com/api';

// Axios instance for default configuration
const api = axios.create({
  baseURL: BASE_URL,
});

// Get content
export const getContent = async () => {
    const response = await api.get('/home');
    return response.data;
  };

  export const getAbout = async () => {
    const response = await api.get('/about');
    return response.data;
  };

  export const getFAQs = async () => {
    const response = await api.get('/faqs');
    return response.data;
  };

  export const getProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
  };

  export const getTeam = async () => {
    const response = await api.get('/team-members');
    return response.data;
  };
  