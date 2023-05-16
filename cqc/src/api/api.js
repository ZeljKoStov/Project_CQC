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

export const details = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/details`,
    isAuthorize: false,
});

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

export const processing = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/processing/process`,
    isAuthorize: false,
});

export const register = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/register`,
    isAuthorize: false,
});

export const vote = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/vote`,
    isAuthorize: false,
});

export const submit = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/submit`,
    isAuthorize: false,
});

export const addOrder = async (email, _orders, address, tokens, callback ) => {
    try {
        fetch(`${getBaseUrl}/users/order`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                items: _orders,
                address: address,
                totalPriceInCents: _orders.reduce((accumulator, order) => { return accumulator + order.cost; }, 0),
                totalShippingInCents: _orders.reduce((accumulator, order) => { return accumulator + order.shippingPriceInCents; }, 0),
                tokens: tokens
            })
        })
        .then(response => { callback(response);})
    } catch (error) {
        console.log(error);
    }
}
