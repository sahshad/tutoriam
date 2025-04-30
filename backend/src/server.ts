import app from "./app";
import {createServer} from 'http'
import {Server} from "socket.io"
import { initSocketServer } from "./infrastructure/socket/socket";

const PORT = process.env.PORT || 5000;

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
})

initSocketServer(io)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

