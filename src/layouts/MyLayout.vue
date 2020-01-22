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
import { mapGetters, mapActions } from 'vuex';

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
    ...mapActions({
      setStreet: 'data/SET_STREET',
      setEmptyStreet: 'data/SET_EMPTY_STREET',
    }),
    loadCep() {
      this.setEmptyStreet();
      const formatResponse = req => req.data;
      const validateIfIsError = (data) => {
        const error = {
          error: new Error('Não foi possível encontrar esse CEP. Verifique o CEP digitado e tente novamente.'),
          isMine: true,
        };

        if (data.erro) throw error;

        return data;
      };
      const showMessage = (error) => {
        const message = error.isMine ? error.error.message : 'Não foi possível fazer a busca no momento. Por favor, tente novamente mais tarde';
        this.$helpers.notifyError(message);
      };
      const emitLoadedEvent = () => this.$root.$emit('cep-loaded');

      this.$axios.get(`https://viacep.com.br/ws/${this.formattedCep}/json`)
        .then(formatResponse)
        .then(validateIfIsError)
        .then(this.setStreet)
        .then(emitLoadedEvent)
        .catch(showMessage);
    },
  },
};
</script>
