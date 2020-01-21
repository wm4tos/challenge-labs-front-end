import Vue from 'vue';
import axios from 'axios';

Vue.prototype.$axios = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});
