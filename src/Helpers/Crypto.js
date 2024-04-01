import CryptoJS from "crypto-js";

const secretPass = "AllHQFlix@2023";

export const encryptData = (text) => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();
    return data;
};

export const decryptData = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
};

export const encryptParams = (params) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(params), secretPass).toString();
  return encodeURIComponent(ciphertext);
};

// Decrypt function
export const decryptParams = (encryptedParams) => {
  const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedParams), secretPass);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};