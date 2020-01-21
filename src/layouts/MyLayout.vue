<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="bg-white text-black row"
    >
      <h1 class="col-xs-12 col-md-4">Consultar</h1>
      <q-form
        class="row items-center"
        @submit="loadCep"
      >
        <q-input
          label="CEP"
          mask="#####-###"
          v-model="cep"
          :rules="[
            val => val && val.length >= 9 || 'Por favor, digite um CEP válido.'
          ]"
        />
        <q-btn
          label="Buscar"
          type="submit"
          no-caps
          class="self-center"
        />
      </q-form>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MyLayout',
  computed: {
    ...mapGetters({
      text: 'search/getCep',
    }),
    cep: {
      get() {
        return this.text;
      },
      set(value) {
        this.$store.dispatch('search/SET_CEP', value);
      },
    },
    formattedCep() {
      return this.cep.replace(/-/g, '');
    },
  },
  methods: {
    async loadCep() {
      try {
        const { erro, ...street } = await this.$axios.get(`${this.formattedCep}/json`);

        if (!erro) {
          return this.$q.notify({
            message: 'Não foi possível encontrar esse CEP. Verifique o CEP digitado e tente novamente.',
            color: 'red-9',
          });
        }

        return this.$store.dispatch('data/SET_STREET', street);
      } catch (error) {
        return this.$q.notify({
          message: 'Não foi possível fazer a busca no momento. Por favor, tente novamente mais tarde.',
          color: 'red-9',
        });
      }
    },
  },
};
</script>
