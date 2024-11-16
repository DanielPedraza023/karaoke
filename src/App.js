import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SongForm from './components/SongForm';
import SongList from './components/SongList';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'false');

  const URL = 'invigorating-freedom-production.up.railway.app'
  const URL2 = "http://localhost:8080"
  // Cargar canciones desde el backend al iniciar
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${URL2}/api/songs`);
        setSongs(response.data);
      } catch (error) {
        console.error('Error al obtener las canciones:', error);
      }
    };

    fetchSongs();
  }, []);

  // Agregar canción
  const addSong = (newSong) => {
    setSongs(prevSongs => [...prevSongs, newSong]); // Actualizar el estado
  };

  // Eliminar canción por ID
  const deleteSong = (id) => {
    if (isAdmin) {
      setSongs(songs.filter(song => song.id !== id)); // Filtrar la canción por ID
    }
  };

  // Limpiar la lista de canciones
  const clearSongs = () => {
    if (isAdmin) {
      axios.delete(`${URL2}/api/songs/all`)
        .then(() => {
          setSongs([]); // Limpiar canciones localmente
          console.log("Lista limpia")
        })
        .catch(error => {
          console.error('Error al limpiar las canciones:', error);
        });
    }
  };

  // Manejar el inicio de sesión del admin
  const handleLogin = () => {
    localStorage.setItem('isAdmin', 'true');
    setIsAdmin(true); // Actualizar el estado para reflejar que el admin ha iniciado sesión
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header setIsAdmin={setIsAdmin} isAdmin={isAdmin} onLogin={handleLogin} />

      <Container maxWidth="sm" sx={{ marginTop: '2rem', flex: '1' }}>
        <SongForm addSong={addSong} />

        {isAdmin && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
            <Button
              onClick={clearSongs}
              variant="contained"
              sx={{
                backgroundColor: '#1C9B8E',
                color: '#AFF0F2',
              }}
            >
              Limpiar Canciones
            </Button>
          </Box>
        )}

        <SongList songs={songs} deleteSong={deleteSong} isAdmin={isAdmin} setSongs={setSongs}/>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;



