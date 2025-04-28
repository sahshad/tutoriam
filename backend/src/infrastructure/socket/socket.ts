// import { Server, Socket } from "socket.io";
// import jwt from 'jsonwebtoken'

// let io: Server

// export const initSocketServer = (server: Server) => {
//     io = server
//     server.use((socket, next) => {
//         const token = socket.handshake.query.token as string
//         try {
//             const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {userId: string, role: string}
//             socket.data.user = user.userId
//              next ()
//         } catch (error) {
//             console.log(error)
//          next(new Error(" Authentication Error"))
//         }
//     })

//     const userSocketMap: Record<string, string> = {}

//     server.on("connection", (socket: Socket) => {
//     console.log(`⚡: User connected: ${socket.id}`);

//     const userId = socket.data.user
//     userSocketMap[userId] = socket.id

//     server.emit("getOnlineUsers", Object.keys(userSocketMap))

//     // socket.on("send-message", (data) => {
//     //   console.log("Received message:", data);

//     //   io.emit("receive-message", data);
//     // });

//     socket.on("send-notification", (data) => {
//         server.emit("receive-notification", data);
//     });

//     socket.on("disconnect", () => {
//       console.log(`🔥: User disconnected: ${socket.id}`);
//       delete userSocketMap[userId]
//       server.emit("getOnlineUsers", Object.keys(userSocketMap))
//     });
//   });
// };


import { Server, Socket } from "socket.io";
import jwt from 'jsonwebtoken'


const userSocketMap: Record<string, string> = {};

let io: Server;

export const initSocketServer = (server: Server) => {
  io = server;

  io.use((socket, next) => {
    const token = socket.handshake.query.token as string;
    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };
      socket.data.user = user.userId;
      next();
    } catch (error) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.data.user;
    userSocketMap[userId] = socket.id;

    console.log(`user is connected to socket : ${socket.id}`)

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
    });
  });
};

export const getIO = () => io;
export const getUserSocketId = (userId: string) => userSocketMap[userId];

