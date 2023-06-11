import { useState, useEffect } from "react";

export default function useLocalStorage(key_, defaultValue) {
  const key = btoa(key_);
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    const storedData = storedValue !== null ? atob(storedValue) : null;

    return storedData !== null ? JSON.parse(storedData) : defaultValue;
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(atob(e.newValue)));
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result =
        typeof newValue === "function" ? newValue(currentValue) : newValue;

      localStorage.setItem(key, btoa(JSON.stringify(result)));

      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
