const getBaseUrl = "http://localhost:3001";

export const login = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/login`,
  isAuthorize: false,
});