import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!userId.trim()) {
      setAlert({ type: 'error', message: 'ID를 입력해주세요.' });
      return false;
    }
    if (!password.trim()) {
      setAlert({ type: 'error', message: '비밀번호를 입력해주세요.' });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setAlert(null);

    try {
      const response = await authAPI.login(userId, password);
      
      // 로그인 성공 여부를 응답 데이터로 판단
      if (response.data && response.data.accessToken) {
        // 토큰이 있으면 로그인 성공
        setAlert({ type: 'success', message: '로그인에 성공했습니다!' });
        
        // 성공 후 대시보드로 이동
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // 토큰이 없으면 로그인 실패
        setAlert({ type: 'error', message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response) {
        // 서버에서 에러 응답이 온 경우
        if (error.response.status === 401) {
          setAlert({ type: 'error', message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
        } else if (error.response.status === 400) {
          const errorMessage = error.response.data?.message || '잘못된 요청입니다. 입력 정보를 확인해주세요.';
          setAlert({ type: 'error', message: errorMessage });
        } else if (error.response.status === 500) {
          setAlert({ type: 'error', message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
        } else {
          const errorMessage = error.response.data?.message || error.response.data?.error || '로그인에 실패했습니다.';
          setAlert({ type: 'error', message: errorMessage });
        }
      } else if (error.request) {
        setAlert({ type: 'error', message: '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.' });
      } else {
        setAlert({ type: 'error', message: '로그인 처리 중 오류가 발생했습니다.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearAlert = () => {
    setAlert(null);
  };

  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(clearAlert, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        p: 2
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IconButton 
              onClick={() => navigate('/')}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" color="text.secondary">
              로그인
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <LoginIcon />
            </Avatar>
            <Typography variant="h4" component="h1">
              로그인
            </Typography>
          </Box>

          {alert && (
            <Alert 
              severity={alert.type} 
              onClose={clearAlert}
              sx={{ mb: 3 }}
            >
              {alert.message}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField
              fullWidth
              label="사용자 ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />

            <TextField
              fullWidth
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                계정이 없으신가요?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#1976d2', 
                    textDecoration: 'none',
                    fontWeight: 500 
                  }}
                >
                  회원가입
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login; 