const cookie = require('react-cookies');

export const setCookie = (cookieName, data, encode = false) => {
    const hostName = window.location.hostname;
    const hostNameArray = hostName.split('.');
  
    const cookieCrossDomain =
        hostNameArray.length > 1
            ? `.${hostNameArray.filter((val, index) => index >= hostNameArray.length - 2).join('.')}` // get last 2 words from hostname if array length > 1 (e.g. bhinneka.com) and append them with '.' (ASCII 46)
            : hostName; // get hostName if array length = 1, e.g. localhost
            

    cookie.save(cookieName, data, { path: "/", domain: cookieCrossDomain });
  
    return cookie;
};

export const getCookie = (cookieName) => {
    if (cookie.load(cookieName) !== undefined) {
        let name = cookie.load(cookieName);
        return name;
    }
    return null;
};