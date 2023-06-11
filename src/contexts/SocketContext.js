/* eslint-disable default-case */
import React, {  useContext, createContext, useEffect } from "react";

import { socket } from "../utils/socket";

export const SocketContext = createContext("");

export default function SocketProvider({ children }) {
  useEffect(() => {
    socket.emit("hehe");
    socket.emit("userOnline", {
      status: true,
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
