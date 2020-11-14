import axios from "axios";

import {
  ADMIN_LOGIN_URL,
  ADMIN_VERIFY_URL,
  LOGIN_URL,
  REGISTER_URL,
  STUDENT_LOGIN_URL,
  VERIFY_URL,
} from "../utils/constants";

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

export const adminLogin = async (email, password) => {
  try {
    const { data } = await axios.post(ADMIN_LOGIN_URL, { email, password });

    return data;
  } catch (err) {
    throw err;
  }
};

export const verifyAdmin = async (otp) => {
  try {
    const { data } = await axios.put(ADMIN_VERIFY_URL, { otp });

    return data;
  } catch (err) {
    throw err;
  }
};

export const studentLogin = async (rollno, password) => {
  try {
    const { data } = await axios.post(STUDENT_LOGIN_URL, { rollno, password });

    return data;
  } catch (err) {
    throw err;
  }
};
