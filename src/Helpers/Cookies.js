
const DEFAULT_EXPIRATION_DAYS = 30; // equivalent to 30 days
var domain = "localhost";
if (process.env.NODE_ENV === 'production') domain = "allhqflix.vercel.app";

export const sanitizeCookieName = (cookieName) => {
    // Define the regular expression pattern for valid characters in a cookie name
    const validCookieNamePattern = /^[a-zA-Z0-9!#$%&'*+\-.^_`|~]+$/;
    // Filter out invalid characters using the pattern
    const sanitizedCookieName = cookieName.split('').filter(char => validCookieNamePattern.test(char)).join('');
    return sanitizedCookieName;
};

export const addCookie = (cookieName, cookieValue, expiryDays = DEFAULT_EXPIRATION_DAYS) => {
  var expires = "";
  if (expiryDays) {
      var date = new Date();
      date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = cookieName + "=" + (cookieValue || "")  + expires + "; path=/; domain=" + domain + "; Secure; SameSite=None";
};

export const getCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
          return cookie.substring(cookieName.length + 1);
      }
  }
  return null;
};

export const deleteCookie = (cookieName) => {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain + "; Secure; SameSite=None";
};