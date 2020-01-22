import state from './initial-state';

export const SET_STREET = ({ commit }, street) => {
  commit('SAVE_STREET', street);
};

export const SET_EMPTY_STREET = ({ commit }) => {
  commit('SAVE_STREET', state.street);
};
