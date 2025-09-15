import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

interface WaterTankProgressProps {
  value: number;
  max?: number;
  width?: number;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  waterColor?: string;
  tankColor?: string;
}

const WaterTankProgress: React.FC<WaterTankProgressProps> = ({
  value,
  max = 100,
  width = 200,
  height = 300,
  label,
  showPercentage = true,
  animated = true,
  waterColor = '#4fc3f7',
  tankColor = '#e0e0e0',
}) => {
  const [waterLevel, setWaterLevel] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaterLevel(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {label && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {label}
        </Typography>
      )}
      
      <Box sx={{ position: 'relative', width, height }}>
        {/* 물통 외곽선 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '4px solid #333',
            borderRadius: '8px 8px 0 0',
            backgroundColor: tankColor,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          {/* 물통 내부 그림자 */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* 물 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 4,
            right: 4,
            height: `${waterLevel}%`,
            background: `linear-gradient(180deg, ${waterColor} 0%, ${waterColor}dd 50%, ${waterColor}aa 100%)`,
            borderRadius: '0 0 4px 4px',
            transition: animated ? 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            overflow: 'hidden',
            '&::before': animated ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.3) 25%, 
                rgba(255,255,255,0.6) 50%, 
                rgba(255,255,255,0.3) 75%, 
                transparent 100%)`,
              animation: 'wave 2s infinite linear',
            } : {},
            '&::after': animated ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '15px',
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.2) 30%, 
                rgba(255,255,255,0.4) 60%, 
                rgba(255,255,255,0.2) 90%, 
                transparent 100%)`,
              animation: 'wave 2.5s infinite linear reverse',
            } : {},
          }}
        />

        {/* 물방울 효과 */}
        {animated && waterLevel > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: `${100 - waterLevel}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              backgroundColor: waterColor,
              borderRadius: '50%',
              animation: 'drip 3s infinite',
              boxShadow: `0 0 6px ${waterColor}`,
            }}
          />
        )}

        {/* 물통 손잡이 */}
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 20,
            height: 8,
            border: '3px solid #333',
            borderBottom: 'none',
            borderRadius: '10px 10px 0 0',
            backgroundColor: 'transparent',
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
              color: waterLevel > 50 ? 'white' : '#333',
              fontWeight: 'bold',
              textShadow: waterLevel > 50 ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        )}
      </Box>

      {/* 물통 바닥 */}
      <Box
        sx={{
          width: width + 8,
          height: 8,
          backgroundColor: '#333',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      />
    </Box>
  );
};

export default WaterTankProgress;
