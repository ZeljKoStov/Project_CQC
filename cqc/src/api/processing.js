const getBaseUrl = "https://intrinsic-backend.xyz";

export const processing = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/processing/process`,
  isAuthorize: false,
});