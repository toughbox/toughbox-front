import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import {
  Launch,
  GitHub,
  Code,
  Storage,
  Cloud,
  ShoppingCart,
  Group,
  Analytics,
  Security,
  DocumentScanner,
} from '@mui/icons-material';

const Projects: React.FC = () => {
  const projects = [
    /* {
      id: 1,
      title: 'E-Commerce 플랫폼',
      description: '대용량 트래픽을 처리할 수 있는 온라인 쇼핑몰 백엔드 시스템',
      detailedDescription: `
        문제: 기존 모놀리식 구조로 인한 확장성 문제와 높은 결합도
        해결: 마이크로서비스 아키텍처 도입으로 서비스별 독립적 배포 가능
        결과: 응답속도 40% 개선, 배포 시간 70% 단축
      `,
      technologies: ['Java 11', 'Spring Boot', 'MySQL', 'Redis', 'Docker', 'AWS ECS'],
      architecture: 'API Gateway → 상품/주문/결제 서비스 → DB 샤딩',
      codeSnippet: `@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
        @RequestBody @Valid OrderRequest request) {
        
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }
}`,
      demoUrl: 'https://demo-ecommerce.example.com',
      githubUrl: 'https://github.com/yourusername/ecommerce-backend',
      icon: <ShoppingCart />,
      color: 'primary.main',
    },
    {
      id: 2,
      title: '사용자 관리 시스템',
      description: 'JWT 기반 인증/인가 시스템과 역할 기반 접근 제어',
      detailedDescription: `
        문제: 세션 기반 인증으로 인한 서버 부하와 확장성 제한
        해결: JWT + Redis를 활용한 토큰 기반 인증 시스템 구축
        결과: 서버 메모리 사용량 60% 감소, 로그인 응답속도 50% 개선
      `,
      technologies: ['Spring Security', 'JWT', 'Redis', 'PostgreSQL', 'Docker'],
      architecture: 'Client → JWT Filter → Authentication Provider → User Service',
      codeSnippet: `@Service
public class JwtTokenProvider {
    
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
    }
}`,
      demoUrl: 'https://demo-auth.example.com',
      githubUrl: 'https://github.com/yourusername/auth-system',
      icon: <Security />,
      color: 'secondary.main',
    },
    {
      id: 3,
      title: '실시간 데이터 분석 API',
      description: '대용량 로그 데이터를 실시간으로 처리하고 분석하는 시스템',
      detailedDescription: `
        문제: 초당 10만건의 로그 데이터 실시간 처리 필요
        해결: Kafka + Spring Boot + InfluxDB 조합으로 스트림 처리
        결과: 실시간 데이터 처리량 1000% 증가, 지연시간 100ms 이하 달성
      `,
      technologies: ['Spring Boot', 'Apache Kafka', 'InfluxDB', 'Elasticsearch', 'Kubernetes'],
      architecture: 'Kafka Producer → Kafka Streams → InfluxDB → REST API',
      codeSnippet: `@Component
@KafkaListener(topics = "user-events")
public class EventProcessor {
    
    @Autowired
    private AnalyticsService analyticsService;
    
    public void processEvent(UserEvent event) {
        analyticsService.aggregateEvent(event);
    }
}`,
      demoUrl: 'https://demo-analytics.example.com',
      githubUrl: 'https://github.com/yourusername/realtime-analytics',
      icon: <Analytics />,
      color: 'success.main',
    },
    {
      id: 4,
      title: '팀 협업 도구',
      description: '실시간 채팅과 파일 공유가 가능한 팀 협업 플랫폼',
      detailedDescription: `
        문제: 기존 이메일 기반 협업의 비효율성
        해결: WebSocket 기반 실시간 통신 + 파일 스토리지 시스템
        결과: 팀 내 커뮤니케이션 효율성 80% 향상
      `,
      technologies: ['Spring WebSocket', 'MongoDB', 'AWS S3', 'React', 'Docker Compose'],
      architecture: 'WebSocket Server → Message Queue → MongoDB + S3 Storage',
      codeSnippet: `@MessageMapping("/chat")
@SendTo("/topic/messages")
public ChatMessage sendMessage(ChatMessage message) {
    message.setTimestamp(Instant.now());
    chatService.saveMessage(message);
    return message;
}`,
      demoUrl: 'https://demo-collaboration.example.com',
      githubUrl: 'https://github.com/yourusername/team-collaboration',
      icon: <Group />,
      color: 'warning.main',
    }, */
    {
      id: 5,
      title: '포트폴리오',
      description: '개발 이력을 남기기 위한 포트폴리오 페이지',
      detailedDescription: `
        - 우분투 환경 구축
        - Spring Boot 로 FrontEnd-BackEnd-AuthService-ApiGateway 구성
        - Github Actions 를 통한 CI/CD
        - Github Container Registry 를 이용하여 도커 이미지 보관
        - Spring Security로 jwt 인증 구현
      `,
      technologies: ['Ubuntu', 'Docker', 'Spring Boot', 'Spring Security', 'MuSQL', 'GitHub', 'GitHub Actions', 'Minio'],
      architecture: 'Frontend Server → Auth Service → Api Gateway → Backend Server → Database + Storage Service',
      codeSnippet: `@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthRepository authRepository;
    private final EncryptService encryptService;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public User createUser(String userId, String password) {
        return authRepository.createUser(new User(userId, password));
    }

    public LoginResponse login(String userId, String password) {
        User user = authRepository.getUserByUserId(userId);

        if (ObjectUtils.isEmpty(user.getUserId()))
            return new LoginResponse();

        if (encryptService.matches(password, user.getPassword())) {
            String accessToken = jwtUtil.generateToken(user.getUserId());
            String refreshToken = jwtUtil.generateRefreshToken(user.getUserId());
            UserResponse userResponse = new UserResponse(String.valueOf(user.getId()), user.getUserId());
            LoginResponse loginResponse = new LoginResponse(accessToken, refreshToken, userResponse);

            return loginResponse;
        }

        throw new RuntimeException("로그인 중 오류가 발생하였습니다.");
    }
}`,
      /* demoUrl: 'http://toughbox.iptime.org:8090/', */
      githubUrl: 'https://github.com/toughbox?tab=repositories',
      icon: <DocumentScanner />,
      color: 'warning.main',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Projects
      </Typography>

      <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
        프로젝트를 소개합니다
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Card
              sx={{
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Project Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: project.color, mr: 2, width: 56, height: 56 }}>
                    {project.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {project.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Project Details */}
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Code sx={{ mr: 1 }} /> 프로젝트 상세
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {project.detailedDescription}
                  </Typography>
                </Paper>

                {/* Technologies */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Storage sx={{ mr: 1 }} /> 적용 기술
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        variant="outlined"
                        size="small"
                        sx={{
                          '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'white',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Architecture */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Cloud sx={{ mr: 1 }} /> 아키텍처
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'info.light', color: 'info.contrastText' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {project.architecture}
                    </Typography>
                  </Paper>
                </Box>

                {/* Code Snippet */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    핵심 코드
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#2d3748',
                      color: '#e2e8f0',
                      overflow: 'auto',
                    }}
                  >
                    <Typography
                      component="pre"
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        lineHeight: 1.4,
                        margin: 0,
                      }}
                    >
                      {project.codeSnippet}
                    </Typography>
                  </Paper>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Actions */}
                <CardActions sx={{ justifyContent: 'space-between', px: 0 }}>
                  <Box>
                    {/* <Button
                      variant="contained"
                      startIcon={<Launch />}
                      href={project.demoUrl}
                      target="_blank"
                      sx={{ mr: 2 }}
                    >
                      데모 보기
                    </Button> */}
                    <Button
                      variant="outlined"
                      startIcon={<GitHub />}
                      href={project.githubUrl}
                      target="_blank"
                    >
                      소스 코드
                    </Button>
                  </Box>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Projects Note */}
      <Paper sx={{ p: 4, mt: 6, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          🚀 더 많은 프로젝트
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          GitHub에서 프로젝트를 확인하실 수 있습니다.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GitHub />}
          href="https://github.com/toughbox?tab=repositories"
          target="_blank"
          size="large"
        >
          GitHub 저장소 보기
        </Button>
      </Paper>
    </Container>
  );
};

export default Projects;
