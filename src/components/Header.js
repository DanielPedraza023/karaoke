import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import AdminLogin from './AdminLogin';

function Header({ setIsAdmin, isAdmin }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#043B38' }}> {/* Color primario */}
      <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography variant="h3" sx={{ color: '#FFF' }}> {/* Color secundario para el texto */}
          Karaoke Restaurante
        </Typography>
        <AdminLogin setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;


