import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#043B38', color: '#AFF0F2' }}>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Karaoke Restaurante - Todos los derechos reservados
      </Typography>
    </Box>
  );
}

export default Footer;


