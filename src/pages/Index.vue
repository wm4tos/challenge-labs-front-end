<template>
  <q-page class="flex flex-center">
    <street-data
      :street="street"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import StreetData from 'components/StreetData.vue';

export default {
  name: 'PageIndex',
  components: {
    StreetData,
  },
  computed: {
    ...mapGetters({
      street: 'data/getStreet',
    }),
  },
};
</script>
