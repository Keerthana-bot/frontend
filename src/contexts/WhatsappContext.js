/* eslint-disable default-case */
import React, { useContext, createContext, useEffect } from "react";

const WhatsappContext = createContext("");

export function WhatsappProvider({ children }) {
  useEffect(() => {
    //
  }, []);

  return (
    <WhatsappContext.Provider
      value={{
        data: "hehehe",
      }}
    >
      {children}
    </WhatsappContext.Provider>
  );
}
