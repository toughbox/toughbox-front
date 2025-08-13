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
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!userId.trim()) {
      setAlert({ type: 'error', message: 'ID를 입력해주세요.' });
      return false;
    }
    if (userId.length < 4) {
      setAlert({ type: 'error', message: 'ID는 4자 이상이어야 합니다.' });
      return false;
    }
    if (!password.trim()) {
      setAlert({ type: 'error', message: '비밀번호를 입력해주세요.' });
      return false;
    }
    if (password.length < 4) {
      setAlert({ type: 'error', message: '비밀번호는 4자 이상이어야 합니다.' });
      return false;
    }
    if (password !== confirmPassword) {
      setAlert({ type: 'error', message: '비밀번호가 일치하지 않습니다.' });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setAlert(null);

    try {
      const response = await authAPI.register(userId, password);
      
      if (response.status === 200 || response.status === 201) {
        setAlert({ type: 'success', message: '회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.' });
        
        // 성공 후 로그인 페이지로 이동
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setAlert({ type: 'error', message: '회원가입에 실패했습니다.' });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error || '회원가입에 실패했습니다.';
        setAlert({ type: 'error', message: errorMessage });
      } else if (error.request) {
        setAlert({ type: 'error', message: '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.' });
      } else {
        setAlert({ type: 'error', message: '회원가입 처리 중 오류가 발생했습니다.' });
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
              회원가입
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
              <PersonAddIcon />
            </Avatar>
            <Typography variant="h4" component="h1">
              회원가입
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
              handleRegister();
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
              helperText="4자 이상의 고유한 ID를 입력하세요"
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
              helperText="4자 이상의 비밀번호를 입력하세요"
            />

            <TextField
              fullWidth
              label="비밀번호 확인"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />,
                endAdornment: (
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              helperText="위에서 입력한 비밀번호를 다시 입력하세요"
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleRegister}
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                이미 계정이 있으신가요?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#1976d2', 
                    textDecoration: 'none',
                    fontWeight: 500 
                  }}
                >
                  로그인
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register; 