import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

interface CustomProgressBarProps {
  value: number;
  max?: number;
  height?: number;
  variant?: 'gradient' | 'neon' | 'glass' | 'minimal';
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  showPercentage?: boolean;
  label?: string;
  animated?: boolean;
  glowEffect?: boolean;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  value,
  max = 100,
  height = 12,
  variant = 'gradient',
  color = 'primary',
  showPercentage = true,
  label,
  animated = true,
  glowEffect = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorScheme = () => {
    switch (color) {
      case 'success':
        return {
          gradient: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 50%, #4caf50 100%)',
          glow: 'rgba(76, 175, 80, 0.6)',
          shadow: '0 0 15px rgba(76, 175, 80, 0.6)',
        };
      case 'warning':
        return {
          gradient: 'linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #ff9800 100%)',
          glow: 'rgba(255, 152, 0, 0.6)',
          shadow: '0 0 15px rgba(255, 152, 0, 0.6)',
        };
      case 'error':
        return {
          gradient: 'linear-gradient(90deg, #f44336 0%, #ff5722 50%, #f44336 100%)',
          glow: 'rgba(244, 67, 54, 0.6)',
          shadow: '0 0 15px rgba(244, 67, 54, 0.6)',
        };
      case 'info':
        return {
          gradient: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 50%, #2196f3 100%)',
          glow: 'rgba(33, 150, 243, 0.6)',
          shadow: '0 0 15px rgba(33, 150, 243, 0.6)',
        };
      default:
        return {
          gradient: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          glow: 'rgba(102, 126, 234, 0.6)',
          shadow: '0 0 15px rgba(102, 126, 234, 0.6)',
        };
    }
  };

  const getVariantStyles = () => {
    const colorScheme = getColorScheme();
    const borderRadius = height / 2;

    switch (variant) {
      case 'neon':
        return {
          container: {
            height,
            borderRadius,
            backgroundColor: 'rgba(0,0,0,0.2)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          bar: {
            borderRadius,
            background: colorScheme.gradient,
            boxShadow: glowEffect ? colorScheme.shadow : 'none',
            position: 'relative' as const,
            overflow: 'hidden' as const,
            '&::before': animated ? {
              content: '""',
              position: 'absolute' as const,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            } : {},
          },
        };
      case 'glass':
        return {
          container: {
            height,
            borderRadius,
            backgroundColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          },
          bar: {
            borderRadius,
            background: colorScheme.gradient,
            boxShadow: glowEffect ? colorScheme.shadow : 'none',
            position: 'relative' as const,
            overflow: 'hidden' as const,
            '&::before': animated ? {
              content: '""',
              position: 'absolute' as const,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              animation: 'shimmer 3s infinite',
            } : {},
          },
        };
      case 'minimal':
        return {
          container: {
            height,
            borderRadius,
            backgroundColor: 'rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.1)',
          },
          bar: {
            borderRadius,
            background: colorScheme.gradient,
            boxShadow: 'none',
          },
        };
      default: // gradient
        return {
          container: {
            height,
            borderRadius,
            backgroundColor: 'rgba(0,0,0,0.1)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          },
          bar: {
            borderRadius,
            background: colorScheme.gradient,
            boxShadow: glowEffect ? colorScheme.shadow : 'none',
            position: 'relative' as const,
            overflow: 'hidden' as const,
            '&::before': animated ? {
              content: '""',
              position: 'absolute' as const,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              animation: 'shimmer 2s infinite',
            } : {},
          },
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
          {label}
        </Typography>
      )}
      <Box sx={{ position: 'relative' }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            ...styles.container,
            '& .MuiLinearProgress-bar': {
              ...styles.bar,
            },
          }}
        />
        {showPercentage && (
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: height < 16 ? '8px' : '10px',
              textShadow: '0 1px 2px rgba(0,0,0,0.7)',
              pointerEvents: 'none',
            }}
          >
            {percentage.toFixed(0)}%
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CustomProgressBar;
