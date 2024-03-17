/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextProvider";
import io from "socket.io-client"

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if(auth?.token){
      const socket = io("http://localhost:5000");
      setSocket(socket);
      return () => socket.close();

    } else {
      if(socket){
        socket.close();
        setSocket(null);
      }
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
}