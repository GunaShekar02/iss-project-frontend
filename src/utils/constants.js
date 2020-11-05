const BASE_URL = `https://certblocks.centralindia.cloudapp.azure.com:5000`;

const AUTH_URL = `${BASE_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;

export const CERTIFICATES_URL = `${BASE_URL}/certificates`;
export const VERIFY_URL = `${CERTIFICATES_URL}/verify`;
export const ISSUE_URL = `${CERTIFICATES_URL}/bulkissue`;
