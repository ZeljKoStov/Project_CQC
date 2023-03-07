const getBaseUrl = "https://intrinsic-backend.xyz";
//const getBaseUrl = "http://localhost:3001";

export const login = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/login`,
  isAuthorize: false,
});

export const userData = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/data`,
  isAuthorize: false,
});