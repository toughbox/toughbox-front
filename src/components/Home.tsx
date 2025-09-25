import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Avatar,
  Chip,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  Download,
  Code,
  Cloud,
  Storage,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const techStack = [
    'Java',
    'Spring Boot',
    'Spring Security',
    'JPA',
    'JWT',
    'Git',
    'REST API',
    'RDB',
    'MySQL',
    'Kafka',
    'JQuery',
    'Javascript',
    'HTML',
    'MSA'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: 6,
        }}
      >
        
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          안녕하세요! 👋
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.secondary' }}>
          Backend Developer | Java | Spring | Architecture
        </Typography>
        <Typography variant="h6" sx={{ mb: 0, maxWidth: 1200, color: 'text.secondary' }}>
          확장 가능하고 안정적인 백엔드 시스템을 구축하는 것을 좋아하는 개발자입니다.
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, maxWidth: 1200, color: 'text.secondary' }}>
          Clean Code와 효율적인 아키텍처 설계에 관심이 많습니다.
        </Typography>

        {/* Contact Buttons */}
        {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Email />}
            href="mailto:your.email@example.com"
            sx={{ minWidth: 120 }}
          >
            이메일
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
            href="https://github.com/yourusername"
            target="_blank"
            sx={{ minWidth: 120 }}
          >
            GitHub
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LinkedIn />}
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            sx={{ minWidth: 120 }}
          >
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Download />}
            href="/resume.pdf"
            target="_blank"
            sx={{ minWidth: 120 }}
          >
            이력서
          </Button>
        </Box> */}
      </Box>

      {/* Quick Tech Stack */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
          🛠️ 기술 스택
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              sx={{
                fontSize: '0.9rem',
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'white',
                },
              }}
            />
          ))}
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: 3,
              },
            }}
          >
            <Code sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              15+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              년간 개발 경험
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: 3,
              },
            }}
          >
            <Storage sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              20+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              완료한 프로젝트
            </Typography>
          </Paper>
        </Grid>
        
        {/* <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: 'center',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: 3,
              },
            }}
          >
            <Cloud sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              5+
            </Typography>
            <Typography variant="body1" color="text.secondary">
              클라우드 프로젝트
            </Typography>
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Home;
