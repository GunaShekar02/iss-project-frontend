import axios from "axios";

import { CERTIFICATES_URL, VERIFY_URL, ISSUE_URL } from "../utils/constants";

export const fetchCertificate = async (roll) => {
  try {
    const { data } = await axios.get(`${CERTIFICATES_URL}/${roll}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const verifyCertificate = async (certificateData) => {
  try {
    const { data } = await axios.post(VERIFY_URL, { certificateData });
    return data;
  } catch (err) {
    throw err;
  }
};

export const issueCertificates = async (file) => {
  try {
    let formData = new FormData();
    formData.append("studentList", file);

    const { data } = await axios.post(ISSUE_URL, formData, {
      headers: {
        authorization: sessionStorage.getItem("apikey"),
      },
    });

    console.log(data);
  } catch (err) {
    throw err;
  }
};
