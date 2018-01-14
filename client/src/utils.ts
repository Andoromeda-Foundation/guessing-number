/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
import axios from 'axios';
axios.defaults.withCredentials = true;
import {stringify as qsStringify} from 'querystring';

import config from './config';

export const getCookie = (name: string) => {
  if (!name) {
    return '';
  }
  const cookie = `${document.cookie}`;

  const indexStart = cookie.indexOf(`${name}=`);
  if (indexStart === -1) {
    return '';
  }

  let indexEnd = cookie.indexOf(';', indexStart);
  if (indexEnd === -1) {
    indexEnd = cookie.length;
  }

  return decodeURIComponent(cookie.substring(indexStart + name.length + 1, indexEnd));
};

export const getScript = (src: string, onLoad: () => void) => {
  const script: any = document.createElement('script');
  const prior = document.getElementsByTagName('script')[0];
  script.async = true;
  prior.parentNode.insertBefore(script, prior);

  script.onload = script.onreadystatechange = (_: HTMLElement, isAbort: Event) => {
    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null;

      if (!isAbort) {
        onLoad();
      }
    }
  };

  script.src = src;
};

export const get = (url: string, params: any = {}, q: boolean = true) => {
  let query = params;

  if (q) {
    query = qsStringify(params);
  }

  return axios.get(`${config.backendHost}/${url}?${query}`);
};

export const post = (url: string, params: any = {}, q: boolean = true) => {
  let query = params;

  if (q) {
    query = qsStringify(params);
  }

  return axios.post(`${config.backendHost}/url`, query);
};