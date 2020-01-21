<template>
  <q-page class="flex flex-center">
    <street-infos v-bind="street"/>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
import StreetInfos from 'components/StreetInfos.vue';

export default {
  name: 'PageIndex',
  components: {
    StreetInfos,
  },
  computed: {
    ...mapGetters({
      street: 'data/getStreet',
    }),
  },
};
</script>
