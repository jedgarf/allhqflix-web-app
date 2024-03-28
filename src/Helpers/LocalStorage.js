
export const addLocalStorage = (localName, localValue) => {
    localStorage.setItem(localName, localValue);
  };
  
  export const getLocalStorage = (localName) => {
    return localStorage.getItem(localName);
  };
  
  export const removeLocalStorage = (localName) => {
    localStorage.removeItem(localName);
  };