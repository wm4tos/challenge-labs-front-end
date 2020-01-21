import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'quasar';

Vue.prototype.$axios = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

axios.interceptors.request.use(
  (req) => {
    Loading.show();
    return req;
  }, (err) => {
    Loading.hide();

    Promise.reject(err);
  },
);

axios.interceptors.response.use(
  (r) => {
    Loading.hide();

    return r;
  },
  (err) => {
    Loading.hide();

    return Promise.reject(err.response.data);
  },
);
