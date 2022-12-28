const getBaseUrl = "https://intrinsic-backend.xyz";

export const register = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/register`,
  isAuthorize: false,
});