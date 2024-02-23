
export const addSession = (sessionName, sessionValue) => {
  sessionStorage.setItem(sessionName, sessionValue);
};

export const getSession = (sessionName) => {
  return sessionStorage.getItem(sessionName);
};

export const removeSession = (sessionName) => {
    sessionStorage.removeItem(sessionName);
};