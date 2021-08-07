<template>
  <v-container>
    <v-card>
      <v-form class="pa-4">
        <v-text-field
          prepend-icon="mdi-account"
          v-model="name"
          :error-messages="nameErrors"
          label="Nome"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-at"
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-card-account-details"
          v-model="cpf"
          v-mask="'###.###.###-##'"
          :error-messages="cpfErrors"
          label="CPF"
          required
          @input="$v.cpf.$touch()"
          @blur="$v.cpf.$touch()"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-badge-account"
          v-model="ra"
          label="RA"
          class="pb-4"
          readonly
          disabled
        ></v-text-field>

        <v-btn class="mr-4" color="success" @click="submit">
          <v-icon left> mdi-content-save </v-icon> Salvar
        </v-btn>
        <v-btn class="mr-4" color="warning" @click="clear"
          ><v-icon left> mdi-eraser </v-icon> limpar
        </v-btn>
        <v-btn href="/consulta" color="error"
          ><v-icon left> mdi-close-thick </v-icon> cancelar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(3) },
    email: { required, email },
    cpf: { required, minLength: minLength(14) },
  },

  data: () => ({
    name: "",
    email: "",
    cpf: "",
    ra: "",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Nome deve ter 3 caracteres ou mais.");
      !this.$v.name.required && errors.push("Nome é obrigatório.");
      return errors;
    },
    cpfErrors() {
      const errors = [];
      if (!this.$v.cpf.$dirty) return errors;
      !this.$v.cpf.minLength && errors.push("CPF deve ter 11 dígitos.");
      !this.$v.cpf.required && errors.push("CPF é obrigatório.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Insira um e-mail válido.");
      !this.$v.email.required && errors.push("E-mail é obrigatório.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.cpf = "";
    },
  },
};
</script>