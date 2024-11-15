import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function AdminLogin({ setIsAdmin, isAdmin }) {
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    } else{
        alert("Contraseña Incorrecta")
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <Box sx={{ mt: 3 }}>
      {isAdmin ? (
        <Button variant="contained" color="secondary" onClick={handleLogout}
        sx={{
            backgroundColor: isAdmin ? '#1C9B8E' : '#30D9C8', // Color para admin y no admin
            color: '#043B38',
            marginBottom: '1rem' // Espacio debajo del botón
          }}>
          Cerrar Sesión
        </Button>
      ) : (
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Contraseña de administrador"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
                style: { color: '#FFF' } // Cambia '#AFF0F2' al color que prefieras
              }}
              InputLabelProps={{
                style: { color: '#FFF' } // Cambia el color del label aquí
              }}
          />
          <Button type="submit" variant="contained" color="primary"
          sx={{
            backgroundColor: isAdmin ? '#1C9B8E' : '#30D9C8', // Color para admin y no admin
            color: '#043B38',
            marginBottom: '1rem' // Espacio debajo del botón
          }}>
            Iniciar Sesión
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default AdminLogin;


