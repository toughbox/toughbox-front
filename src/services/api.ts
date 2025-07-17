import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (인증 토큰 등 추가)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userId: string, password: string) => 
    apiClient.post('/auth/users', { userId, password }),
  login: (userId: string, password: string) => 
    apiClient.post('/auth/login', { userId, password }),
  getUsers: () => 
    apiClient.get('/auth/users'),
};

export default apiClient; 