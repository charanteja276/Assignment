import http from 'http';
import app from './src/app.js';
import { initWebSocket } from './src/services/websocketService.js';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
