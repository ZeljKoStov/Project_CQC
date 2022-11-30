const getBaseUrl = "http://localhost:3001";

export const processing = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/processing/process`,
  isAuthorize: false,
});