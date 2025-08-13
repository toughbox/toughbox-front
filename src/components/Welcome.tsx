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
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Apps as AppsIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 4,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 3,
              width: '100%',
              maxWidth: 444,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 64, height: 64 }}>
              <AppsIcon sx={{ fontSize: 32 }} />
            </Avatar>
            
            <Typography component="h1" variant="h3" sx={{ mb: 1, fontWeight: 300 }}>
              ToughBox
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
              환영합니다
            </Typography>

            <Box component="form" sx={{ mt: 1, width: '100%' }}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 1,
                }}
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
              >
                로그인
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                  또는
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>

              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{ 
                  mt: 0, 
                  mb: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 1,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
                startIcon={<PersonAddIcon />}
                onClick={() => navigate('/register')}
              >
                사용자 등록
              </Button>

              <Typography 
                variant="body2" 
                color="text.secondary" 
                align="center" 
                sx={{ mt: 4 }}
              >

              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Welcome; 