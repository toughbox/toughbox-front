import React, { useState, useEffect, useRef } from 'react';
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
import CustomProgressBar from './CustomProgressBar';
import BinaryProgress from './BinaryProgress';

const Sample: React.FC = () => {
  const MAX_VALUE = 257; // 목표 값 상수
  
  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    const id = setInterval(() => {
      setCurrentValue(prev => {
        if (prev >= MAX_VALUE) {
          setIsRunning(false);
          clearInterval(id);
          intervalIdRef.current = null;
          return MAX_VALUE;
        }
        return prev + 1;
      });
    }, 100); // 100ms마다 업데이트 (더 느리게)
    
    intervalIdRef.current = id;
  };

  const stopProgress = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsRunning(false);
  };

  const resetProgress = () => {
    stopProgress();
    setCurrentValue(1);
    setProgress(0);
  };

  useEffect(() => {
    setProgress((currentValue / MAX_VALUE) * 100);
  }, [currentValue]);

  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []); // 빈 의존성 배열로 변경

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
                상태: {isRunning ? '진행 중' : currentValue === MAX_VALUE ? '완료' : '대기 중'}
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
                  현재 값: {currentValue} / {MAX_VALUE}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  진행률: {progress.toFixed(1)}%
                </Typography>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 12,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                        animation: 'shimmer 2s infinite',
                      },
                    },
                  }}
                />
                {/* 프로그레스 텍스트 오버레이 */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                >
                  {progress.toFixed(1)}%
                </Box>
              </Box>
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
                    {MAX_VALUE}
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
                    {MAX_VALUE - currentValue}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#fff3e0' }}>
                  <Typography variant="body2" color="text.secondary">
                    완료 상태
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {currentValue === MAX_VALUE ? '완료' : '진행 중'}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, backgroundColor: '#fce4ec' }}>
                  <Typography variant="body2" color="text.secondary">
                    예상 완료 시간
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {currentValue === MAX_VALUE ? '완료됨' : `${((MAX_VALUE - currentValue) * 0.1).toFixed(1)}초`}
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
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress}
                      sx={{
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 8,
                          background: currentValue === MAX_VALUE 
                            ? 'linear-gradient(90deg, #4caf50 0%, #8bc34a 50%, #4caf50 100%)'
                            : 'linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #ff9800 100%)',
                          boxShadow: currentValue === MAX_VALUE 
                            ? '0 0 15px rgba(76, 175, 80, 0.6)'
                            : '0 0 15px rgba(255, 152, 0, 0.6)',
                          animation: currentValue === MAX_VALUE ? 'glow 2s infinite' : 'none',
                        },
                      }}
                    />
                    {/* 진행률 텍스트 */}
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '10px',
                        textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                      }}
                    >
                      {progress.toFixed(0)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 기발한 프로그레스바들 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                기발한 프로그레스바 스타일들
              </Typography>
              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <BinaryProgress
                      value={currentValue}
                      max={MAX_VALUE}
                      width={300}
                      height={30}
                      label="바이너리 코드 프로그레스바"
                      animated={true}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 커스텀 프로그레스바 데모 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                다양한 스타일의 프로그레스바
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CustomProgressBar
                    value={progress}
                    height={16}
                    variant="gradient"
                    color="primary"
                    label="그라데이션 스타일"
                    animated={true}
                    glowEffect={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomProgressBar
                    value={progress}
                    height={16}
                    variant="neon"
                    color="success"
                    label="네온 스타일"
                    animated={true}
                    glowEffect={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomProgressBar
                    value={progress}
                    height={16}
                    variant="glass"
                    color="warning"
                    label="글래스 스타일"
                    animated={true}
                    glowEffect={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomProgressBar
                    value={progress}
                    height={16}
                    variant="minimal"
                    color="info"
                    label="미니멀 스타일"
                    animated={false}
                    glowEffect={false}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sample;
