import Cookies from 'js-cookie';

const DEFAULT_EXPIRATION_DAYS = 30; // equivalent to 30 days

export const sanitizeCookieName = (cookieName) => {
    // Define the regular expression pattern for valid characters in a cookie name
    const validCookieNamePattern = /^[a-zA-Z0-9!#$%&'*+\-.^_`|~]+$/;
  
    // Filter out invalid characters using the pattern
    const sanitizedCookieName = cookieName.split('').filter(char => validCookieNamePattern.test(char)).join('');
  
    return sanitizedCookieName;
};

export const addCookie = (cookieName, cookieValue, expiryDays = DEFAULT_EXPIRATION_DAYS, options = {}) => {
  Cookies.set(cookieName, cookieValue, { expires: expiryDays ? expiryDays : DEFAULT_EXPIRATION_DAYS, ...options });
};

export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

export const deleteCookie = (cookieName) => {
  Cookies.remove(cookieName);
};