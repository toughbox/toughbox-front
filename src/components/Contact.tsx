import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  Email,
  GitHub,
  LinkedIn,
  Phone,
  LocationOn,
  Send,
  Chat,
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const contactInfo = [
    {
      icon: <Phone />,
      title: '전화번호',
      value: '+82 10-1234-5678',
      link: 'tel:+821012345678',
      color: 'success.main',
    },
    {
      icon: <Email />,
      title: '이메일',
      value: 'tough@kakao.com',
      link: 'mailto:tough@kakao.com',
      color: 'primary.main',
    },
    {
      icon: <GitHub />,
      title: 'GitHub',
      value: 'github.com/toughbox',
      link: 'https://github.com/toughbox?tab=repositories',
      color: '#333',
    },
    /* {
      icon: <LinkedIn />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile',
      color: '#0077b5',
    },
    {
      icon: <LocationOn />,
      title: '위치',
      value: '서울, 대한민국',
      link: '',
      color: 'error.main',
    },
    {
      icon: <Chat />,
      title: '카카오톡 오픈채팅',
      value: '개발자와 대화하기',
      link: 'https://open.kakao.com/o/your-openchat-link',
      color: '#fee500',
    }, */
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 실제 구현에서는 이메일 전송 API를 호출
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
        Contact
      </Typography>
      
      {/* <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
        프로젝트 제안이나 협업 문의는 언제든 환영합니다! 🤝
      </Typography> */}

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: 'fit-content' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              📞 연락처 정보
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactInfo.map((contact, index) => (
                <Card
                  key={index}
                  sx={{
                    cursor: contact.link ? 'pointer' : 'default',
                    '&:hover': contact.link ? {
                      transform: 'translateX(4px)',
                      transition: 'transform 0.2s ease-in-out',
                      boxShadow: 2,
                    } : {},
                  }}
                  onClick={() => contact.link && window.open(contact.link, '_blank')}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: contact.color,
                          mr: 2,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {contact.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {contact.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {contact.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                ☕ 커피챗 환영
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                기술 이야기나 개발 경험을 나누는 것을 좋아합니다.
                <br />
                언제든 편하게 연락주세요!
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Form */}
        {/* <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              💌 메시지 보내기
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="이메일"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="제목"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="메시지"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    variant="outlined"
                    placeholder="프로젝트 제안, 협업 문의, 기술 질문 등 무엇이든 편하게 남겨주세요!"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? null : <Send />}
                    sx={{ py: 1.5, mt: 2 }}
                  >
                    {isSubmitting ? '전송 중...' : '메시지 전송'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                💡 <strong>빠른 응답을 원하신다면</strong>
                <br />
                이메일이나 LinkedIn 메시지를 추천드립니다!
              </Typography>
            </Box>
          </Paper>
        </Grid> */}
      </Grid>

      {/* Resume Download Section */}
      {/* <Paper
        sx={{
          mt: 6,
          p: 4,
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h5" gutterBottom>
          📄 이력서 다운로드
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          상세한 경력과 프로젝트 정보가 담긴 이력서를 확인해보세요
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          href="/resume.pdf"
          target="_blank"
          sx={{ px: 4, py: 1.5 }}
        >
          PDF 이력서 다운로드
        </Button>
      </Paper> */}

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
