import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SongForm from './components/SongForm';
import SongList from './components/SongList';

function App() {
  const [songs, setSongs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem('songs')) || [];
    setSongs(savedSongs);
  }, []);

  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) => {
    setSongs([...songs, song]);
  };

  const deleteSong = (index) => {
    if (isAdmin) {
      const newSongs = songs.filter((_, i) => i !== index);
      setSongs(newSongs);
    }
  };

  const clearSongs = () => {
    if (isAdmin) {
      setSongs([]);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Header setIsAdmin={setIsAdmin} isAdmin={isAdmin} />

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

  

  <SongList songs={songs} deleteSong={deleteSong} isAdmin={isAdmin} />
</Container>


      <Footer />
    </Box>
  );
}

export default App;


