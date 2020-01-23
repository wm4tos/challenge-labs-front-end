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
      required: true,
      validator(val) {
        const props = ['lat', 'lng'];

        return val === null || validateProps(val, ...props);
      },
    },
  },
};
</script>
