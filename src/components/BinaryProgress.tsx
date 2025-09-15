import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

interface BinaryProgressProps {
  value: number;
  max?: number;
  width?: number;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const BinaryProgress: React.FC<BinaryProgressProps> = ({
  value,
  max = 100,
  width = 300,
  height = 20,
  label,
  showPercentage = true,
  animated = true,
}) => {
  const [filledBits, setFilledBits] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  const totalBits = Math.floor(width / 12); // 각 비트당 12px
  const bitsToFill = Math.floor((percentage / 100) * totalBits);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setFilledBits(bitsToFill);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setFilledBits(bitsToFill);
    }
  }, [bitsToFill, animated]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      {label && (
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          {label}
        </Typography>
      )}
      
      <Box sx={{ position: 'relative', width, height }}>
        {/* 바이너리 비트들 */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
          {Array.from({ length: totalBits }, (_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index < filledBits ? '#4fc3f7' : '#e0e0e0',
                transition: animated ? 'background-color 0.3s ease' : 'none',
                boxShadow: index < filledBits ? '0 0 6px rgba(79, 195, 247, 0.6)' : 'none',
                animation: index < filledBits && animated ? 'pulse 1s infinite' : 'none',
                animationDelay: `${index * 0.05}s`,
              }}
            />
          ))}
        </Box>
        
        {/* 진행률 텍스트 */}
        {showPercentage && (
          <Typography
            variant="body1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '12px',
              pointerEvents: 'none',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BinaryProgress;
