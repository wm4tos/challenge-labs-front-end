<template>
  <q-page class="row">
    <div class="col-12 flex justify-end">
      <q-btn
        class="self-start"
        icon="close"
        @click="clearStreetAndCenter"
      />
    </div>
    <div class="col-12 flex justify-center">
      <street-data
        v-if="center"
        :street="street"
        :center="center"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StreetData from 'components/StreetData.vue';

export default {
  name: 'PageIndex',
  data: () => ({
    center: null,
  }),
  components: {
    StreetData,
  },
  computed: {
    ...mapGetters({
      street: 'data/getStreet',
    }),
  },
  methods: {
    ...mapActions({
      setEmptyStreet: 'data/SET_EMPTY_STREET',
    }),
    clearStreetAndCenter() {
      this.setEmptyStreet();
      this.center = null;
    },
    loadFullAddres() {
      const formatResponse = req => req.data;
      const validateIfIsError = (data) => {
        if (data.error_message) throw new Error(data.error_message);

        return data;
      };
      const getLatLng = (data) => {
        const { results } = data;

        const [result] = results;

        const { location } = result.geometry;

        return location;
      };
      const fillGlobalVariable = (location) => {
        this.center = location;
      };
      const showErrorMessage = (err) => {
        this.$helpers.notifyError(err.message);
      };

      this.$axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.street.logradouro}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then(formatResponse)
        .then(validateIfIsError)
        .then(getLatLng)
        .then(fillGlobalVariable)
        .catch(showErrorMessage);
    },
    setCenterAsNull() {
      this.center = null;
    },
  },
  mounted() {
    this.$root.$on('cep-load-start', this.setCenterAsNull);
    this.$root.$on('cep-load-finish', this.loadFullAddres);
  },
};
</script>
