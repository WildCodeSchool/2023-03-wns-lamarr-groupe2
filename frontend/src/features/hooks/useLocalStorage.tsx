import { useState, useEffect } from "react";
import { TUser } from "../contexts/utils/types";

function getStorageValue(
  key: "user" | "token",
  defaultValue: string | {} | TUser
) {
  /* We get the value in the localstorage
  then we convert it and send back at the defautl value */
  try {
    const saved = localStorage.getItem(key);
    const initial = saved && JSON.parse(saved);
    return initial || defaultValue;
  } catch (error) {
    console.error(`Error parsing JSON for key '${key}':`, error);
    return defaultValue;
  }
}

const useLocalStorage = (
  key: "user" | "token",
  defaultValue: string | {} | TUser
) => {
  /* The value is the result of the getStorageValue function */
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  /* With useEffect, we get the value and set it or we set the default value */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
