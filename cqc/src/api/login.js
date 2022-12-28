const getBaseUrl = "https://intrinsic-backend.xyz";

export const login = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/login`,
  isAuthorize: false,
});