/* eslint-disable default-case */
import React, { useContext, createContext, useEffect } from "react";

import { socket } from "../utils/socket";

const sendContext = createContext("");

export function sendProvider({ children }) {
  useEffect(() => {
    //
  }, []);

  return (
    <sendContext.Provider
      value={{
        data: "hehehe",
      }}
    >
      {children}
    </sendContext.Provider>
  );
}

export function useSend() {
  return useContext(sendContext);
}