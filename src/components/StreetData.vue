<template>
  <div>
    <street-infos v-bind="street"/>
    <gmap :center="center"/>
  </div>
</template>

<script>
import StreetInfos from 'components/StreetInfos';
import { validateProps } from 'src/helpers';
import Gmap from './Gmap';

export default {
  components: {
    StreetInfos,
    Gmap,
  },
  props: {
    street: {
      type: Object,
      required: true,
      validator(obj) {
        const props = [
          'logradouro',
          'cep',
          'bairro',
          'complemento',
          'localidade',
          'uf',
          'ibge',
          'gia',
          'unidade',
        ];

        return validateProps(obj, ...props);
      },
    },
    center: {
      type: Object,
      required: true,
      validator(obj) {
        const props = ['lat', 'lng'];

        return validateProps(obj, ...props);
      },
    },
  },
};
</script>
