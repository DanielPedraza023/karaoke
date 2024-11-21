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



