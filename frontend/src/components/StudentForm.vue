<template>
  <v-container>
    <v-card>
      <!-- Form start -->
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
    <!-- Form end -->
    <!-- Loading Dialog start -->
    <template>
      <v-dialog v-model="loadingDialog" persistent max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Salvando...
          </v-card-title>
          <v-card-subtitle class="text-center pt-5">
            <v-icon x-large class="pr-3">mdi-loading mdi-spin</v-icon>
          </v-card-subtitle>
        </v-card>
      </v-dialog>
    </template>
    <!-- Loading Dialog end -->

    <!-- Next Dialog start -->
    <template>
      <v-dialog v-model="nextDialog" persistent max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Cadastro salvo com sucesso!
          </v-card-title>
          <v-card-subtitle class="text-center text-h5 pt-2">
            O que deseja fazer a seguir?
          </v-card-subtitle>
          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-flex class="px-auto">
              <v-btn color="green darken-1" text @click="nextDialog = false">
                Cadastrar novo aluno
              </v-btn>
              <v-btn color="green darken-1" text href="/consulta">
                Voltar à consulta
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Next Dialog end -->

    <!-- Invalid Dialog start -->
    <template>
      <v-dialog v-model="invalidDialog" max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Dados inválidos
          </v-card-title>
          <v-card-subtitle class="text-center text-h5 pt-2">
            Revise os dados e tente novamente
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="invalidDialog = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Invalid Dialog end -->
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

  data() {
    return {
      name: "",
      email: "",
      cpf: "",
      ra: "",
      loadingDialog: false,
      nextDialog: false,
      invalidDialog: false,
    };
  },

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
      if (this.$v.$invalid) {
        this.invalidDialog = true;
      } else {
        this.loadingDialog = true;
        this.$http
          .post("http://localhost:5000/estudantes", {
            name: this.name,
            email: this.email,
            cpf: this.cpf,
          })
          .then(function (data) {
            this.loadingDialog = false;
            if (data.status === 200) {
              this.nextDialog = true;
            } else {
              console.log("fail");
            }
            this.clear();
          });
      }
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