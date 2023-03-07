const getBaseUrl = "https://intrinsic-backend.xyz";
//const getBaseUrl = "http://localhost:3001";

export const register = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/register`,
  isAuthorize: false,
});