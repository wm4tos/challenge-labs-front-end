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
        const ERROR = 'A API do Google Maps tá com um probleminha... Pode tentar de novo depois?';
        const REQUEST_DENIED = 'Acho que... Essa página não pode fazer essa requisição. Mas ué?';
        const OVER_QUERY_LIMIT = 'Desculpe, mas a API bateu o limite máximo de requisições :(';
        const ZERO_RESULTS = 'Desculpe, mas essa rua não foi encontrada na API do Google Maps :/';
        const INVALID_REQUEST = 'Isso não devia acontecer, mas acho que tem um parâmetro faltando na busca. :O';

        const mapsStatus = {
          ZERO_RESULTS,
          OVER_QUERY_LIMIT,
          REQUEST_DENIED,
          ERROR,
          UNKNOWN_ERROR: ERROR,
          INVALID_REQUEST,
        };

        if (data.status !== 'OK') throw new Error(mapsStatus[data.status]);

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
