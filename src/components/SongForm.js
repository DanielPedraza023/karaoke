import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function SongForm({ addSong }) {
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && singer) {
      addSong({ title, singer });
      setTitle('');
      setSinger('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField
        label="Título de la canción"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Cantante o grupo"
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#30D9C8', color: '#043B38' }}> {/* Color tercero */}
        Agregar Canción
      </Button>
    </Box>
  );
}

export default SongForm;


