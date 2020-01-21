import Vue from 'vue';

export const SAVE_STREET = (state, street) => {
  Vue.set(state, 'street', street);
};
