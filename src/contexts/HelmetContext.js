import React, { createContext, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const helmetContext = createContext("");

export const HelmetProvider = ({ children }) => {
  const [focus, setFocus] = useState(true);
  const [title, setTitle] = useState("KEERTHANA");
  const [description, setDescription] = useState("KEERTHANA");
  const [icon, setIcon] = useState("https://github.com/keerthana-bot.png");

  useEffect(() => {
    if (!title) setTitle("KEERTHANA");
    if (!description) setDescription("KEERTHANA");
    if (!icon) setIcon("https://github.com/keerthana-bot.png");
  }, [title, description, icon]);

  useEffect(() => {
    const handleBlur = () => setFocus(false);
    const handleFocus = () => setFocus(true);

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <helmetContext.Provider value={{ setTitle, setDescription, setIcon }}>
      <>
        <Helmet>
          <title>{`${focus ? " " + title : " Offline :) | "}`}</title>
          <meta name="description" content={description} />
          <link rel="icon" href={icon} />
        </Helmet>
        {children}
      </>
    </helmetContext.Provider>
  );
};

export function useHelmet() {
 return useContext(helmetContext);
}
