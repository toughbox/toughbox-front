import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Storage,
} from '@mui/icons-material';

const Content: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* 상단 통계 카드들 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    총 사용자
                  </Typography>
                  <Typography variant="h5">
                    24,568
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp color="success" fontSize="small" />
                    <Typography color="success.main" variant="body2">
                      +12%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <ShoppingCart />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    주문 수
                  </Typography>
                  <Typography variant="h5">
                    1,423
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingDown color="error" fontSize="small" />
                    <Typography color="error.main" variant="body2">
                      -3%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <AttachMoney />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    총 수익
                  </Typography>
                  <Typography variant="h5">
                    ₩45.2M
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp color="success" fontSize="small" />
                    <Typography color="success.main" variant="body2">
                      +8%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 250px', minWidth: '250px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <Storage />
                </Avatar>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    저장소 사용량
                  </Typography>
                  <Typography variant="h5">
                    78%
                  </Typography>
                  <Box sx={{ position: 'relative', mt: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={78} 
                      sx={{ 
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 6,
                          background: 'linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #ff9800 100%)',
                          boxShadow: '0 0 10px rgba(255, 152, 0, 0.4)',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '9px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                      }}
                    >
                      78%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* 콘텐츠 영역 */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '2 1 500px', minWidth: '500px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              최근 활동
            </Typography>
            <List>
              {[
                { user: '김철수', action: '새 프로젝트를 생성했습니다', time: '2분 전', status: 'success' },
                { user: '이영희', action: '보고서를 업로드했습니다', time: '5분 전', status: 'info' },
                { user: '박민수', action: '설정을 변경했습니다', time: '10분 전', status: 'warning' },
                { user: '최지영', action: '새 사용자를 초대했습니다', time: '15분 전', status: 'success' },
              ].map((activity, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{activity.user[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${activity.user} ${activity.action}`}
                    secondary={activity.time}
                  />
                  <Chip 
                    label={activity.status} 
                    color={activity.status as 'success' | 'info' | 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        
        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                빠른 작업
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" fullWidth>
                  새 프로젝트 생성
                </Button>
                <Button variant="outlined" fullWidth>
                  사용자 초대
                </Button>
                <Button variant="outlined" fullWidth>
                  보고서 생성
                </Button>
                <Button variant="outlined" fullWidth>
                  설정 관리
                </Button>
              </Box>
            </Paper>
            
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                시스템 상태
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    API 서버
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={95} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 50%, #4caf50 100%)',
                          boxShadow: '0 0 8px rgba(76, 175, 80, 0.5)',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '8px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                      }}
                    >
                      95%
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    데이터베이스
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={82} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #ff9800 100%)',
                          boxShadow: '0 0 8px rgba(255, 152, 0, 0.5)',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '8px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                      }}
                    >
                      82%
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    파일 저장소
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={67} 
                      sx={{ 
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 50%, #2196f3 100%)',
                          boxShadow: '0 0 8px rgba(33, 150, 243, 0.5)',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '8px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                      }}
                    >
                      67%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content; 