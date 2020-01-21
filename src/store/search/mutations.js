import Vue from 'vue';

export const SAVE_CEP = (state, cep) => {
  Vue.set(state, 'cep', cep);
};
