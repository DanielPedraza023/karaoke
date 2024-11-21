import axios from 'axios';

const URL = "http://localhost:8080"; // Cambia esto por la URL del backend en producción si es necesario

const apiService = {
  getSongs: async () => {
    try {
      const response = await axios.get(`${URL}/api/songs`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
      throw error;
    }
  },

  addSong: async (song) => {
    try {
      const response = await axios.post(`${URL}/api/songs`, song);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la canción:", error);
      throw error;
    }
  },

  deleteSong: async (id) => {
    try {
      await axios.delete(`${URL}/api/songs/${id}`);
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
      throw error;
    }
  },

  clearSongs: async () => {
    try {
      await axios.delete(`${URL}/api/songs/all`);
    } catch (error) {
      console.error("Error al limpiar las canciones:", error);
      throw error;
    }
  },
};


export default apiService;
