<template>
  <div>
    <street-infos v-bind="street"/>
  </div>
</template>

<script>
import StreetInfos from 'components/StreetInfos';
import { validateProps } from 'src/helpers';

export default {
  components: {
    StreetInfos,
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
  },
};
</script>
