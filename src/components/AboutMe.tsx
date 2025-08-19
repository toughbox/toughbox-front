import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Code,
  Storage,
  Cloud,
  Security,
  Speed,
  Architecture,
  BugReport,
  Timeline,
} from '@mui/icons-material';

const AboutMe: React.FC = () => {
  const skills = [
    { name: 'Java', level: 90, icon: <Code /> },
    { name: 'Spring Boot', level: 85, icon: <Architecture /> },
    { name: 'JPA/Hibernate', level: 80, icon: <Storage /> },
    { name: 'MySQL', level: 85, icon: <Storage /> },
    { name: 'Redis', level: 75, icon: <Speed /> },
    { name: 'Docker', level: 80, icon: <Cloud /> },
    { name: 'AWS', level: 70, icon: <Cloud /> },
    { name: 'Spring Security', level: 75, icon: <Security /> },
  ];

  const interests = [
    {
      title: 'Clean Code',
      description: '읽기 쉽고 유지보수가 가능한 코드 작성',
      icon: <Code />,
    },
    {
      title: 'Hexagonal Architecture',
      description: '도메인 중심의 아키텍처 설계',
      icon: <Architecture />,
    },
    {
      title: '대규모 트래픽 처리',
      description: '고성능 시스템 설계 및 최적화',
      icon: <Speed />,
    },
    {
      title: '테스트 주도 개발',
      description: '안정적인 소프트웨어 개발',
      icon: <BugReport />,
    },
  ];

  const experiences = [
    {
      period: '2024.01 - 현재',
      title: 'Senior Backend Developer',
      company: 'TechCorp',
      description: '마이크로서비스 아키텍처 설계 및 구현, Spring Boot 기반 API 개발',
    },
    {
      period: '2022.03 - 2023.12',
      title: 'Backend Developer',
      company: 'StartupInc',
      description: 'E-commerce 플랫폼 백엔드 개발, 결제 시스템 구축',
    },
    {
      period: '2021.01 - 2022.02',
      title: 'Junior Developer',
      company: 'DevStudio',
      description: '웹 애플리케이션 개발, RESTful API 설계 및 구현',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        About Me
      </Typography>

      {/* Introduction */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          👨‍💻 개발자 소개
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
          안녕하세요! 3년차 백엔드 개발자입니다. 주로 Java와 Spring 생태계를 활용하여 
          확장 가능하고 안정적인 서버 시스템을 구축하는 일을 하고 있습니다.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
          단순히 기능을 구현하는 것을 넘어서, 비즈니스 요구사항을 정확히 이해하고 
          적절한 기술적 해결책을 제시하는 것을 중요하게 생각합니다.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          최근에는 클라우드 네이티브 아키텍처와 DevOps에 관심을 가지고 있으며, 
          지속적인 학습을 통해 더 나은 개발자가 되기 위해 노력하고 있습니다.
        </Typography>
      </Paper>

      {/* Skills */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          🛠️ 기술 스택
        </Typography>
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} md={6} key={skill.name}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: 'primary.main' }}>
                  {skill.icon}
                </Avatar>
                <Typography variant="body1" sx={{ fontWeight: 500, flex: 1 }}>
                  {skill.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {skill.level}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={skill.level}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Interests */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          💡 개발 철학 & 관심 분야
        </Typography>
        <Grid container spacing={3}>
          {interests.map((interest, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      {interest.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3">
                      {interest.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {interest.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Experience */}
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          💼 경력 사항
        </Typography>
        <Box>
          {experiences.map((exp, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                mb: 3,
                pb: 3,
                borderBottom: index < experiences.length - 1 ? '1px solid #e0e0e0' : 'none',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', mr: 3, mt: 1 }}>
                <Timeline />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Chip
                  label={exp.period}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {exp.title}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {exp.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutMe;
