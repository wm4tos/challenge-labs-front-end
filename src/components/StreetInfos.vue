<template>
  <div class="text-left full-width full-height row flex-start">
    <h1 class="col-12"> {{ logradouro }} </h1>
    <p class="col-12">{{ `${localidade} - ${uf}` }}</p>
    <p class="col-12">{{ bairro }}</p>
    <p class="col-12">{{ cep }}</p>
  </div>
</template>

<script>

export default {
  props: {
    logradouro: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    complemento: {
      type: String,
    },
    localidade: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      required: true,
    },
    ibge: {
      type: String,
      required: true,
    },
    gia: {
      type: String,
      required: true,
    },
    unidade: {
      type: String,
      required: true,
    },
  },
};
</script>
