import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  Divider,
  CssBaseline,
  Paper,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Code as CodeIcon,
  GitHub,
  LinkedIn,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 2, md: 4 },
        }}
      >
        <CssBaseline />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexDirection: { xs: 'column', md: 'row' },
              minHeight: '80vh',
            }}
          >
            {/* 왼쪽: 소개 텍스트 */}
            <Box
              sx={{
                flex: 1,
                color: 'white',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.1,
                }}
              >
                Backend Developer
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  opacity: 0.9,
                  fontWeight: 400,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                }}
              >
                Java | Spring | Cloud | Architecture
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.8,
                  lineHeight: 1.6,
                  maxWidth: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                확장 가능하고 안정적인 백엔드 시스템을 구축하는 것을 좋아하는 개발자입니다.
                <br />
                Clean Code와 효율적인 아키텍처 설계에 관심이 많습니다.
              </Typography>
              
              {/* 소셜 링크 */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button
                  variant="outlined"
                  startIcon={<GitHub />}
                  href="https://github.com/yourusername"
                  target="_blank"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LinkedIn />}
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  LinkedIn
                </Button>
              </Box>
            </Box>

            {/* 오른쪽: 로그인 카드 */}
            <Box
              sx={{
                flex: { xs: 1, md: 0 },
                width: { xs: '100%', sm: 400, md: 470, lg: 530 },
                maxWidth: 530,
                minWidth: { sm: 400, md: 470 },
              }}
            >
              <Paper
                sx={{
                  p: { xs: 4, sm: 5, lg: 6 },
                  borderRadius: 3,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: { xs: 'auto', lg: 480 },
                  height: 'fit-content',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
                  <Avatar sx={{ mb: 2, bgcolor: 'primary.main', width: 64, height: 64 }}>
                    <CodeIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  
                  <Typography component="h2" variant="h4" sx={{ mb: 1.5, fontWeight: 700, textAlign: 'center' }}>
                    Portfolio Access
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 0, textAlign: 'center', lineHeight: 1.6 }}>
                    포트폴리오 콘텐츠에 접근하려면 로그인하세요
                  </Typography>
                </Box>

                <Box sx={{ width: '100%' }}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ 
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      mb: 2.5,
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 3,
                      },
                    }}
                    startIcon={<LoginIcon />}
                    onClick={() => navigate('/login')}
                  >
                    로그인
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 2, fontWeight: 500 }}>
                      또는
                    </Typography>
                    <Divider sx={{ flexGrow: 1 }} />
                  </Box>

                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    size="large"
                    sx={{ 
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/register')}
                  >
                    회원가입
                  </Button>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    align="center" 
                    sx={{ mt: 4, opacity: 0.7, fontSize: '0.85rem' }}
                  >
                    © 2024 Developer Portfolio
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Welcome; 