import * as VueGoogleMaps from 'vue2-google-maps';

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GOOGLE_MAPS_API_KEY,
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)

      // // If you want to set the version, you can do so:
      // v: '3.26',
    },
    installComponents: true,
  });
};
