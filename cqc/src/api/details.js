const getBaseUrl = "https://intrinsic-backend.xyz";
//const getBaseUrl = "http://localhost:3001";

export const details = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/details`,
  isAuthorize: false,
});