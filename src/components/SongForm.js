import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function SongForm({ addSong }) {
  const [name, setName] = useState('');
  const [singer, setSinger] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && singer) {
      const newSong = { name, singer };
      // Enviar la canción al backend
      axios.post('http://localhost:8080/api/songs', newSong)
        .then(response => {
          console.log("Cancion agregada: ", response.data)
          addSong(response.data) //=> [...prevSongs, response.data]); // Agregar canción a la lista local
          setName('');
          setSinger('');
        })
        .catch(error => {
          console.error('Error al agregar la canción:', error);
        });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField
        label="Título de la canción"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Cantante o grupo"
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#30D9C8', color: '#043B38' }}>
        Agregar Canción
      </Button>
    </Box>
  );
}

export default SongForm;



