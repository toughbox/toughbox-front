import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import { PlayArrow, Stop, Refresh } from '@mui/icons-material';

const Sample: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    const id = setInterval(() => {
      setCurrentValue(prev => {
        if (prev >= 1000) {
          setIsRunning(false);
          clearInterval(id);
          return 1000;
        }
        return prev + 1;
      });
    }, 10); // 10ms마다 업데이트
    
    setIntervalId(id);
  };

  const stopProgress = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  const resetProgress = () => {
    stopProgress();
    setCurrentValue(1);
    setProgress(0);
  };

  useEffect(() => {
    setProgress((currentValue / 1000) * 100);
  }, [currentValue]);

  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Sample Progress
      </Typography>

      <Grid container spacing={3}>
        {/* 컨트롤 버튼 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                컨트롤
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={startProgress}
                  disabled={isRunning}
                  sx={{ minWidth: 120 }}
                >
                  시작
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Stop />}
                  onClick={stopProgress}
                  disabled={!isRunning}
                  sx={{ minWidth: 120 }}
                >
                  정지
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={resetProgress}
                  disabled={isRunning}
                  sx={{ minWidth: 120 }}
                >
                  리셋
                </Button>
              </Box>
              <Typography variant="body2" color="text.secondary">
                상태: {isRunning ? '진행 중' : currentValue === 1000 ? '완료' : '대기 중'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 메인 프로그레스 바 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                진행 상황
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  현재 값: {currentValue} / 1000
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  진행률: {progress.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 10,
                    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 상세 정보 카드들 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                진행 통계
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body2" color="text.secondary">
                    시작 값
                  </Typography>
                  <Typography variant="h6">1</Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#e3f2fd' }}>
                  <Typography variant="body2" color="text.secondary">
                    현재 값
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {currentValue}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#f3e5f5' }}>
                  <Typography variant="body2" color="text.secondary">
                    목표 값
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    1000
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                진행 상태
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper sx={{ p: 2, backgroundColor: '#e8f5e8' }}>
                  <Typography variant="body2" color="text.secondary">
                    남은 값
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {1000 - currentValue}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#fff3e0' }}>
                  <Typography variant="body2" color="text.secondary">
                    완료 상태
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {currentValue === 1000 ? '완료' : '진행 중'}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#fce4ec' }}>
                  <Typography variant="body2" color="text.secondary">
                    예상 완료 시간
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {currentValue === 1000 ? '완료됨' : `${((1000 - currentValue) * 0.01).toFixed(1)}초`}
                  </Typography>
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 추가 프로그레스 바들 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                다양한 스타일의 프로그레스 바
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* 기본 스타일 */}
                <Box>
                  <Typography variant="body2" gutterBottom>
                    기본 스타일
                  </Typography>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>

                {/* 버퍼 스타일 */}
                <Box>
                  <Typography variant="body2" gutterBottom>
                    버퍼 스타일
                  </Typography>
                  <LinearProgress 
                    variant="buffer" 
                    value={progress} 
                    valueBuffer={progress + 5}
                  />
                </Box>

                {/* 색상 변경 */}
                <Box>
                  <Typography variant="body2" gutterBottom>
                    색상 변경
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress}
                    color="secondary"
                    sx={{ height: 8 }}
                  />
                </Box>

                {/* 성공 색상 */}
                <Box>
                  <Typography variant="body2" gutterBottom>
                    성공 색상
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress}
                    sx={{
                      height: 8,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: currentValue === 1000 ? '#4caf50' : '#ff9800',
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sample;
