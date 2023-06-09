/* eslint-disable default-case */
import React, {  useContext, createContext, useEffect } from "react";

import { socket } from "../utils/socket";

const SocketContext = createContext("");

export function SocketProvider({ children }) {
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

export function useSocket() {
  return useContext(SocketContext);
}
