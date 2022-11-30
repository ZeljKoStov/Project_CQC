import Axios from 'axios';
import { toLower } from 'lodash';
import qs from 'qs';

export const jsonToQueryString = (json: any) =>
  Object.keys(json).map(key => { return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);}).join('&');

export const RequestAPI = (data) => {
  console.log(data);
  const { method, url, headerAdditional, params } = data;
  let { body } = data;

  let headers = { 
    'Content-Type': 'application/json',
  };

  if (headerAdditional) {
    headers = Object.assign({}, headers, headerAdditional);
  }

  let Action;
  if (toLower(method) === 'get') {
    const configAxios = {
      headers,
      method,
      params,
      paramsSerializer: (param: any) => qs.stringify(param, { encode: false }),
      url,
    };

    Action = Axios(configAxios);
  } else {
    const BODY = { method, url, headers, data: body, params };
    Action = Axios(BODY);
  }
  return Action;
};

export default RequestAPI;
