import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
//import SongForm from './SongForm'; // Importamos el formulario de canciones

function SongList({songs, setSongs, isAdmin}) {
  //const [songs, setSongs] = useState([]);
  //const [isAdmin, setIsAdmin] = useState(false);

  // Verificar si el admin está logueado al cargar la página
  useEffect(() => {
    // Cargar canciones desde el backend (simulado)
    axios.get('http://localhost:8080/api/songs')  // Suponiendo que el backend está corriendo en localhost
      .then(response => {
        setSongs(response.data); // Actualizamos la lista de canciones
      })
      .catch(error => {
        console.error('Error al obtener las canciones:', error);
      });
  }, [setSongs]);

  // Eliminar canción
  const deleteSong = (id) => {
    axios.delete(`http://localhost:8080/api/songs/${id}`)
      .then(() => {
        setSongs(songs.filter(song => song.id !== id)); // Eliminar canción de la lista
      })
      .catch(error => {
        console.error('Error al eliminar la canción:', error);
      });
  };

  return (
    <Box sx={{ marginTop: '1rem' }}>
      {/* Mostrar la lista de canciones */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#043B38' }}>
        Canciones en la lista:
      </Typography>
      <List>
        {songs.map((song) => (
          <ListItem
            key={song.id}
            sx={{
              backgroundColor: '#eee',
              margin: '0.5rem 0',
              borderRadius: '8px',
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <ListItemText
              primary={`${song.name} - ${song.singer}`}
              sx={{ fontSize: '1.1rem', color: '#043B38' }}
            />
            {isAdmin && (
              <IconButton onClick={() => deleteSong(song.id)} sx={{ color: '#000' }}>
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>


    </Box>
  );
}

export default SongList;



