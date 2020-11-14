import axios from "axios";
import { RESULTS_URL, UPLOAD_RESULTS_URL } from "../utils/constants";

export const uploadResults = async (file, sem, token) => {
  try {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("sem", sem);

    const { data } = await axios.put(UPLOAD_RESULTS_URL, formData, {
      headers: { Authorization: token },
    });

    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchResults = async (rollno, semester, token) => {
  try {
    const {
      data,
    } = await axios.get(
      `${RESULTS_URL}?rollno=${rollno}&semester=${semester}`,
      { headers: { Authorization: token } }
    );

    return data;
  } catch (err) {
    throw err;
  }
};
