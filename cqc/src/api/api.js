//const getBaseUrl = "https://intrinsic-backend.xyz";
const getBaseUrl = "http://localhost:3001";

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

export const getAllOrders = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getAllOrders`,
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

export const changeExposure = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/processing/processWithExposure`,
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

export const deleteSubmition = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/deleteSubmition`,
    isAuthorize: false,
});

export const getSubs = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getSubs`,
    isAuthorize: false,
});

export const getMySub = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getMySub`,
    isAuthorize: false,
});



export const getFocused = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getFocused`,
    isAuthorize: false,
});

export const getDiffused = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getDiffused`,
    isAuthorize: false,
});

export const getIntrinsic = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getIntrinsic`,
    isAuthorize: false,
});

export const addOrder = async (email, _orders, address, tokens,totalCost,totalShipping, callback ) => {
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
                totalPriceInCents: totalCost,
                totalShippingInCents: totalShipping,
                tokens: tokens
            })
        })
        .then(response => { callback(response);})
    } catch (error) {
        console.log(error);
    }
}

export const getMyScores = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getMyScores`,
    isAuthorize: false,
});

export const getAllScores = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/getAllScores`,
    isAuthorize: false,
});

export const submitScore = (body) => ({
    body,
    method: 'POST',
    url: `${getBaseUrl}/users/submitScore`,
    isAuthorize: false,
});
