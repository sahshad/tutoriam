import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addMessage } from "@/redux/slices/messageSlice";

const SOCKET_URL = "http://localhost:5000";

const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch()
  useEffect(() => {
    if (user && accessToken) {
      const newSocket = io(SOCKET_URL, {
        query: { token: accessToken },
      });

      setSocket(newSocket)

      newSocket.on("connection", () => {
        setIsConnected(true);
      });

      // newSocket.on("getOnlineUsers", (users) => {
      //   console.log(users)
      // })
      newSocket.on("newMessage", (message) => {
        dispatch(addMessage(message))
      })

      newSocket.on("disconnect", () => {
        setIsConnected(false);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      setSocket(null);
      setIsConnected(false);
    }
  }, [user, accessToken]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
