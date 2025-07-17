import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { authAPI } from '../services/api';

// 가상의 사용자 데이터베이스
interface User {
  id: string;
  userId: string;
  password: string;
  registeredAt: string;
}

const Authentication: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: '1', userId: 'admin', password: '1234', registeredAt: '2024-01-15' },
    { id: '2', userId: 'user1', password: 'password', registeredAt: '2024-01-16' },
  ]);

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
      
      // 성공 조건 확인 (HTTP 상태 코드 기반)
      if (response.status === 200 || response.status === 201) {
        // 응답이 성공적이면 무조건 성공 처리
        setAlert({ type: 'success', message: `회원가입이 완료되었습니다! (ID: ${userId})` });
        
        // 폼 초기화
        setUserId('');
        setPassword('');
        setConfirmPassword('');
        
        // 로컬 사용자 목록에도 추가 (UI 업데이트용)
        const newUser: User = {
          id: Date.now().toString(),
          userId: userId,
          password: '*'.repeat(password.length),
          registeredAt: new Date().toISOString().split('T')[0],
        };
        setUsers(prev => [...prev, newUser]);
      } else {
        setAlert({ type: 'error', message: '회원가입에 실패했습니다.' });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.response) {
        // 서버에서 응답한 에러
        const errorMessage = error.response.data?.message || error.response.data?.error || '회원가입에 실패했습니다.';
        setAlert({ type: 'error', message: errorMessage });
      } else if (error.request) {
        // 네트워크 에러
        setAlert({ type: 'error', message: '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.' });
      } else {
        // 기타 에러
        setAlert({ type: 'error', message: '회원가입 처리 중 오류가 발생했습니다.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = (userIdToDelete: string) => {
    setUsers(prev => prev.filter(user => user.id !== userIdToDelete));
    setAlert({ type: 'info', message: '사용자가 삭제되었습니다.' });
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
        사용자 관리
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* 회원가입 폼 */}
        <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PersonAddIcon />
                </Avatar>
                <Typography variant="h5" component="h2">
                  새 사용자 등록
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
                sx={{ mt: 2 }}
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
                  {isLoading ? '사용자 등록 중...' : '사용자 등록'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* 등록된 사용자 목록 */}
        <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              등록된 사용자 목록 ({users.length}명)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {users.map((user, index) => (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={`가입일: ${user.registeredAt}`} 
                        size="small" 
                        variant="outlined"
                      />
                      <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => handleDeleteUser(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                  sx={{ 
                    mb: 1, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                      {user.userId[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.userId}
                    secondary={`비밀번호: ${'*'.repeat(user.password.length)} (${user.password.length}자)`}
                  />
                </ListItem>
              ))}
            </List>

            {users.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                <PersonIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography>등록된 사용자가 없습니다.</Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Authentication; 