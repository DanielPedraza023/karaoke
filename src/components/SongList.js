import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SongList({ songs, deleteSong, isAdmin }) {
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#043B38' }}>
        Canciones en la lista:
      </Typography>
      <List>
        {songs.map((song, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: '#eee', // Fondo para cada canción
              margin: '0.5rem 0', // Espacio entre canciones
              borderRadius: '8px', // Bordes redondeados
              padding: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra para efecto
            }}
          >
            <ListItemText
              primary={`#${index + 1} - ${song.title} - ${song.singer}`} // Asegúrate de que `song` sea un string
              sx={{
                fontSize: '1.1rem', // Aumentar el tamaño de la fuente
                color: '#043B38', // Color de texto
              }}
            />
            {isAdmin && (
              <IconButton onClick={() => deleteSong(index)} sx={{ color: '#000' }}>
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





