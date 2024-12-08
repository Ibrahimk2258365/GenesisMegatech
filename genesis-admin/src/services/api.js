import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:5001/api';

// Axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
});

// Attach Authorization token to every request if available
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/**
 * Project Management APIs
 */
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const updateProject = async (id, updatedData) => {
  const response = await api.put(`/projects/${id}`, updatedData);
  return response.data;
};

export const deleteProject = async (id) => {
  await api.delete(`/projects/${id}`);
};

/**
 * Authentication APIs
 */
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', loginData);
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get('/auth/users');
  return response.data;
};

/**
 * Content Management APIs
 */
export const createContent = async (data) => {
  const response = await api.post('/home', data);
  return response.data;
};

export const getContent = async () => {
  const response = await api.get('/home');
  return response.data;
};

export const updateContent = async (data) => {
  const response = await api.put('/home', data);
  return response.data;
};

export const deleteContent = async () => {
  const response = await api.delete('/home');
  return response.data;
};

/**
 * FAQ Management APIs
 */
export const createFAQ = async (faqData) => {
  const response = await api.post('/faqs', faqData);
  return response.data;
};

export const getFAQs = async () => {
  const response = await api.get('/faqs');
  return response.data;
};

export const updateFAQ = async (id, faqData) => {
  const response = await api.put(`/faqs/${id}`, faqData);
  return response.data;
};

export const deleteFAQ = async (id) => {
  const response = await api.delete(`/faqs/${id}`);
  return response.data;
};

/**
 * About Us Management APIs
 */
export const createAbout = async (data) => {
  const response = await api.post('/about', data);
  return response.data;
};

export const getAbout = async () => {
  const response = await api.get('/about');
  return response.data;
};

export const updateAbout = async (data) => {
  const response = await api.put('/about', data);
  return response.data;
};

export const deleteAbout = async () => {
  const response = await api.delete('/about');
  return response.data;
};

/**
 * Team Management APIs
 */
export const createTeamMember = async (teamMemberData) => {
  const response = await api.post('/team-members', teamMemberData);
  return response.data;
};

export const getTeamMembers = async () => {
  const response = await api.get('/team-members');
  return response.data;
};

export const getTeamMember = async (id) => {
  const response = await api.get(`/team-members/${id}`);
  return response.data;
};

export const updateTeamMember = async (id, teamMemberData) => {
  const response = await api.put(`/team-members/${id}`, teamMemberData);
  return response.data;
};

export const deleteTeamMember = async (id) => {
  const response = await api.delete(`/team-members/${id}`);
  return response.data;
};

export default api;
