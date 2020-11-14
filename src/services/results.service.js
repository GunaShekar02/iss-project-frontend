import axios from "axios";
import { UPLOAD_RESULTS_URL } from "../utils/constants";

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
