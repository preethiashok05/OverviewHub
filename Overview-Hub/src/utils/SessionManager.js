const USER_SESSION_KEY = 'userSession';


export const setUserSession = (user) => {
  const start = Date.now();
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  setTimeout(() => {
    clearUserSession();
  }, 1000*60*60*24);
};

export const getUserSession = () => {
  const userSession = localStorage.getItem(USER_SESSION_KEY);
  return userSession ? JSON.parse(userSession) : null;
};

export const clearUserSession = () => {
  console.log("session over")
  localStorage.removeItem(USER_SESSION_KEY);
  return null;
  
};


