<template>
  <div>
    <street-infos v-bind="street"/>
  </div>
</template>

<script>
import StreetInfos from 'components/StreetInfos';

export default {
  components: {
    StreetInfos,
  },
  props: {
    street: {
      type: Object,
      required: true,
      validator(val) {
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

        const hasSomeError = props.map(prop => !Object.prototype.hasOwnProperty.call(val, prop));

        return hasSomeError.some(x => !x);
      },
    },
  },
};
</script>
