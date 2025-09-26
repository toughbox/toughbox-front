import axios from 'axios';

// 배포 환경에 맞는 API 기본 URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// JWT 토큰 관리 유틸리티
export const TokenManager = {
  // 토큰 저장
  setToken: (token: string) => {
    localStorage.setItem('accessToken', token);
  },

  // 리프레시 토큰 저장
  setRefreshToken: (refreshToken: string) => {
    localStorage.setItem('refreshToken', refreshToken);
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  // 리프레시 토큰 가져오기
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  // 토큰 삭제 (로그아웃)
  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // JWT 디코딩
  decodeToken: (token: string) => {
    try {
      console.log('토큰 디코딩 시작:', token.substring(0, 50) + '...');
      const parts = token.split('.');
      console.log('토큰 부분 개수:', parts.length);
      
      if (parts.length !== 3) {
        console.log('JWT 형식이 아님 (3개 부분이 아님)');
        return null;
      }
      
      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      console.log('토큰 디코딩 성공:', decoded);
      return decoded;
    } catch (error) {
      console.error('토큰 디코딩 실패:', error);
      return null;
    }
  },

  // 토큰 만료 확인
  isTokenExpired: (token: string): boolean => {
    try {
      console.log('토큰 만료 확인 시작');
      const decoded = TokenManager.decodeToken(token);
      console.log('디코딩된 토큰:', decoded);
      
      if (!decoded || !decoded.exp) {
        console.log('토큰에 exp 클레임이 없음');
        return true;
      }
      
      const currentTime = Date.now() / 1000;
      console.log('현재 시간:', currentTime, '토큰 만료 시간:', decoded.exp);
      const isExpired = decoded.exp < currentTime;
      console.log('토큰 만료 여부:', isExpired);
      
      return isExpired;
    } catch (error) {
      console.log('토큰 만료 확인 중 에러:', error);
      return true;
    }
  },

  // 토큰 유효성 검사
  isTokenValid: (): boolean => {
    const token = TokenManager.getToken();
    console.log('토큰 유효성 검사 - 토큰:', token ? '존재' : '없음');
    
    if (!token) {
      console.log('토큰이 없어서 인증 실패');
      return false;
    }
    
    const isExpired = TokenManager.isTokenExpired(token);
    console.log('토큰 만료 여부:', isExpired);
    
    if (isExpired) {
      console.log('토큰이 만료되어서 인증 실패');
      return false;
    }
    
    console.log('토큰이 유효해서 인증 성공');
    return true;
  },

  // 사용자 정보 저장/가져오기
  setUser: (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,  // CORS 쿠키 전송 허용
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 요청 인터셉터 (개선된 토큰 처리)
apiClient.interceptors.request.use((config) => {
  const token = TokenManager.getToken();
  if (token && TokenManager.isTokenValid()) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (토큰 만료 처리)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 (인증 실패) 시 토큰 만료 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 리프레시 토큰으로 토큰 갱신 시도
      const refreshToken = TokenManager.getRefreshToken();
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken
          });
          
          const newToken = response.data.accessToken;
          TokenManager.setToken(newToken);
          
          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
        }
      }

      // 토큰 갱신 실패 시 로그아웃 처리
      TokenManager.clearTokens();
      window.location.href = '/';
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  // 회원가입
  register: (userId: string, password: string) => 
    apiClient.post('/users', { userId, password }),
  
  // 로그인 (토큰 자동 저장)
  login: async (userId: string, password: string) => {
    const response = await apiClient.post('/users/login', { userId, password });
    
    console.log('로그인 응답:', response.data);
    
    // 로그인 성공 시에만 토큰 저장
    if (response.data.accessToken) {
      console.log('accessToken 저장:', response.data.accessToken);
      TokenManager.setToken(response.data.accessToken);
      
      if (response.data.refreshToken) {
        console.log('refreshToken 저장:', response.data.refreshToken);
        TokenManager.setRefreshToken(response.data.refreshToken);
      } else {
        console.log('응답에 refreshToken이 없음');
      }
      
      if (response.data.user) {
        console.log('user 정보 저장:', response.data.user);
        TokenManager.setUser(response.data.user);
      } else {
        console.log('응답에 user 정보가 없음');
      }
    } else {
      console.log('응답에 accessToken이 없음 - 로그인 실패');
      // 토큰이 없으면 로그인 실패로 처리
      //throw new Error('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
    }
    
    return response;
  },

  // 로그아웃
  logout: async () => {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.error('로그아웃 API 에러:', error);
    } finally {
      TokenManager.clearTokens();
    }
  },

  // 토큰 갱신
  refreshToken: () => {
    const refreshToken = TokenManager.getRefreshToken();
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  // 사용자 목록 조회
  getUsers: () => apiClient.get('/users'),
};

export default apiClient; 