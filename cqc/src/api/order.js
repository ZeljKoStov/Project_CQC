const getBaseUrl = "https://intrinsic-backend.xyz";
//const getBaseUrl = "http://localhost:3001";

export const order = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/order`,
  isAuthorize: false,
});

export const getOrders = (body) => ({
    body,
    method: 'GET',
    url: `${getBaseUrl}/users/getOrders`,
    isAuthorize: false,
});

export const getShippingPrice = (body) => ({
  body,
  method: 'POST',
  url: `${getBaseUrl}/users/shipping`,
  isAuthorize: false,
})