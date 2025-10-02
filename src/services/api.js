import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || '',
      timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000'),
      headers: { 'Content-Type': 'application/json' },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'ksm_auth_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'ksm_auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, config) {
    const res = await this.api.get(url, config);
    return res.data;
    }

  async post(url, data, config) {
    const res = await this.api.post(url, data, config);
    return res.data;
  }

  async put(url, data, config) {
    const res = await this.api.put(url, data, config);
    return res.data;
  }

  async patch(url, data, config) {
    const res = await this.api.patch(url, data, config);
    return res.data;
  }

  async delete(url, config) {
    const res = await this.api.delete(url, config);
    return res.data;
  }

  async upload(url, formData, config) {
    const res = await this.api.post(url, formData, {
      ...config,
      headers: { ...config?.headers, 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  }

  setAuthToken(token) {
    localStorage.setItem(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'ksm_auth_token', token);
  }

  removeAuthToken() {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'ksm_auth_token');
  }

  getAuthToken() {
    return localStorage.getItem(process.env.REACT_APP_TOKEN_STORAGE_KEY || 'ksm_auth_token');
  }
}

const apiService = new ApiService();
export default apiService;


