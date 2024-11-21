import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SongForm from './components/SongForm';
import SongList from './components/SongList';
import apiService from './services/apiService';



function App() {
  const [songs, setSongs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');


  // Cargar canciones desde el backend al iniciar
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await apiService.getSongs();
        setSongs(songs);
      } catch (error) {
        console.error(error);
      }
    };

    //Inicializar canciones y websockets
    fetchSongs();
    apiService.connectWebSocket((updatedSongs) => {
      setSongs(updatedSongs); // Actualizar canciones en tiempo real
    });

    // Limpiar conexión WebSocket al desmontar
    return () => {
      apiService.disconnectWebSocket();
    };
  }, []);

  // Agregar canción
  const addSong = async(newSong) => {
    //setSongs(prevSongs => [...prevSongs, newSong]); // Actualizar el estado
    try{
      const addedSong = await apiService.addSong(newSong)
      setSongs(prevSongs => [...prevSongs, addedSong])
      alert("¡Canción agregada correctamente!")
    }
    catch(error){
      console.error(error)
    }
  };

  // Eliminar canción por ID
  const deleteSong = async (id) => {
    if (isAdmin) {
      try{
        await apiService.deleteSong(id);
        setSongs(songs.filter(song => song.id !== id)); // Filtrar la canción por ID
        alert("¡Canción eliminada correctamente!")
      }
      catch(error){
        console.error(error);
      }
    }
  };

  // Limpiar la lista de canciones
  const clearSongs = async() => {
    if (isAdmin) {
      try{
        await apiService.clearSongs();
        setSongs([]);
        alert("¡Lista de canciones reinciada!")
      }
      catch(error){
        console.error(error);
      }
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



