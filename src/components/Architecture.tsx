import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const Architecture: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
      Portfolio System Architecture
      </Typography>
      <Paper elevation={3} sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Box 
          component="img" 
          src="/images/architecture-diagram.png" 
          alt="System Architecture Diagram" 
          sx={{ 
            width: '100%', 
            maxWidth: '1400px', 
            height: 'auto', 
            display: 'block', 
            objectFit: 'contain'
          }} 
        />
      </Paper>
    </Container>
  );
};

export default Architecture;
