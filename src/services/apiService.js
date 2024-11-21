import axios from 'axios';


let socket = null; // Declarar y definir la variable socket
//let onMessageCallback = null;

const URL = "http://localhost:8080"; 
const URL_WS = "ws://localhost:8080"; // URL del servidor WebSocket

const URL2 = "https://e420-181-142-193-145.ngrok-free.app";
const URL_WS2 = "wss://e420-181-142-193-145.ngrok-free.app/song-updates"


const apiService = {
  getSongs: async () => {
    try {
      const response = await axios.get(`${URL2}/api/songs`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
      throw error;
    }
  },

  addSong: async (song) => {
    try {
      const response = await axios.post(`${URL2}/api/songs`, song);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la canción:", error);
      throw error;
    }
  },

  deleteSong: async (id) => {
    try {
      await axios.delete(`${URL2}/api/songs/${id}`);
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
      throw error;
    }
  },

  clearSongs: async () => {
    try {
      await axios.delete(`${URL2}/api/songs/all`);
    } catch (error) {
      console.error("Error al limpiar las canciones:", error);
      throw error;
    }
  },
  // Conexión WebSocket
  connectWebSocket: (onMessage) => {
    if (socket) {
      console.warn("WebSocket ya está conectado.");
      return;
    }

    //socket = new WebSocket(`ws://localhost:8080/song-updates`)
    socket = new WebSocket("ws://e420-181-142-193-145.ngrok-free.app/song-updates");

    socket.onopen = () => {
      console.log("Conexión WebSocket establecida.");
    };

    socket.onmessage = (event) => {
        try{
            const data = JSON.parse(event.data);
            console.log("Mensaje recibido del websocket ", data)
            if (onMessage) {
                onMessage(data); // Callback para manejar los mensajes
            }
      }
      catch(error){
        console.error("Error al recibir mensaje del websocket: ", error)
      }
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
      socket = null;
    };

    socket.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };
  },

  disconnectWebSocket: () => {
    if (socket) {
      socket.close();
      socket = null;
      console.log("WebSocket desconectado.");
    }
  },
};


export default apiService;
