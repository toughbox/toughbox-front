import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = '#4fc3f7',
  backgroundColor = '#e0e0e0',
  label,
  showPercentage = true,
  animated = true,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // 애니메이션된 백분율 업데이트
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animated]);
  
  // 진행된 길이 계산
  const progressLength = (animatedPercentage / 100) * circumference;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {label && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {label}
        </Typography>
      )}
      
      <Box sx={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* 배경 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          
          {/* 진행 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${progressLength} ${circumference}`}
            style={{
              transition: animated ? 'stroke-dasharray 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
              filter: 'drop-shadow(0 0 8px rgba(79, 195, 247, 0.5))',
            }}
          />
        </svg>
        
        {/* 중앙 텍스트 */}
        {showPercentage && (
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#333',
              fontWeight: 'bold',
              pointerEvents: 'none',
            }}
          >
            {animatedPercentage.toFixed(0)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CircularProgress;
