const BASE_URL = `https://result-publishing-application.herokuapp.com`;

export const REGISTER_URL = `${BASE_URL}/register`;
export const VERIFY_URL = `${BASE_URL}/verify`;
export const ADMIN_LOGIN_URL = `${BASE_URL}/login`;
export const ADMIN_VERIFY_URL = `${BASE_URL}/verifyadmin`;

const AUTH_URL = `${BASE_URL}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;

export const CERTIFICATES_URL = `${BASE_URL}/certificates`;
// export const VERIFY_URL = `${CERTIFICATES_URL}/verify`;
export const ISSUE_URL = `${CERTIFICATES_URL}/bulkissue`;
