import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import search from './search';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default () => new Store({
  modules: {
    search,
  },
  strict: process.env.DEV,
});
