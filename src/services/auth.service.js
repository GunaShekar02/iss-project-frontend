import axios from "axios";

import { LOGIN_URL } from "../utils/constants";
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
