import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

interface HeartProgressProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  heartColor?: string;
}

const HeartProgress: React.FC<HeartProgressProps> = ({
  value,
  max = 100,
  size = 120,
  label,
  showPercentage = true,
  animated = true,
  heartColor = '#e91e63',
}) => {
  const [fillLevel, setFillLevel] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setFillLevel(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setFillLevel(percentage);
    }
  }, [percentage, animated]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {label && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {label}
        </Typography>
      )}
      
      <Box sx={{ position: 'relative', width: size, height: size }}>
        {/* 하트 외곽선 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background: '#e0e0e0',
              borderRadius: '50% 50% 0 0',
              transform: 'translateX(-50%) rotate(-45deg)',
              transformOrigin: '0 100%',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background: '#e0e0e0',
              borderRadius: '50% 50% 0 0',
              transform: 'translateX(-50%) rotate(45deg)',
              transformOrigin: '100% 100%',
            },
          }}
        />
        
        {/* 하트 채우기 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: `${100 - fillLevel}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background: heartColor,
              borderRadius: '50% 50% 0 0',
              transform: `translateX(-50%) rotate(-45deg)`,
              transformOrigin: '0 100%',
              transition: animated ? 'top 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              boxShadow: `0 0 20px ${heartColor}aa`,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: `${100 - fillLevel}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background: heartColor,
              borderRadius: '50% 50% 0 0',
              transform: `translateX(-50%) rotate(45deg)`,
              transformOrigin: '100% 100%',
              transition: animated ? 'top 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              boxShadow: `0 0 20px ${heartColor}aa`,
            },
          }}
        />
        
        {/* 하트 하단 부분 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '30%',
            background: fillLevel > 0 ? heartColor : '#e0e0e0',
            borderRadius: '0 0 50% 50%',
            transition: animated ? 'background-color 1.5s ease' : 'none',
            boxShadow: fillLevel > 0 ? `0 0 20px ${heartColor}aa` : 'none',
          }}
        />
        
        {/* 진행률 텍스트 */}
        {showPercentage && (
          <Typography
            variant="h4"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: fillLevel > 50 ? 'white' : '#333',
              fontWeight: 'bold',
              textShadow: fillLevel > 50 ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default HeartProgress;
