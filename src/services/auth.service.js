import axios from "axios";

import { LOGIN_URL, REGISTER_URL, VERIFY_URL } from "../utils/constants";

export const register = async (rollno, password) => {
  try {
    const { data } = await axios.post(REGISTER_URL, { rollno, password });

    return data;
  } catch (err) {
    throw err;
  }
};

export const verify = async (otp, publicKey, token) => {
  try {
    const { data } = await axios.post(
      VERIFY_URL,
      { otp, publicKey },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  } catch (err) {
    throw err;
  }
};

export const login = async (apiKey) => {
  try {
    await axios.post(
      LOGIN_URL,
      {},
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    sessionStorage.setItem("apikey", apiKey);
  } catch (err) {
    throw err;
  }
};
