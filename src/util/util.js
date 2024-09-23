import { split } from "postcss/lib/list";

export const setLocalStorage = (key, value) => {
  const localString = JSON.stringify(value);
  localStorage.setItem(key, localString);
};

export const getLocalStorage = (key) => {
  const dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
};

export const removeItemLocalStorage = (key) => {
  const dataLocal = localStorage.getItem(key);
  return dataLocal ? localStorage.removeItem(key) : false;
};

export const limitCharacter = (str, numChar) => {
  return str.length > numChar ? str.slice(0, numChar) + "..." : str;
};
