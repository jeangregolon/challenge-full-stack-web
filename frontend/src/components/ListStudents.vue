<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
        <v-btn rounded dark color="primary" class="ml-2">Cadastrar Aluno</v-btn>
      </v-card-title>

      <v-data-table
        :search="search"
        :headers="headers"
        :items="students"
        :items-per-page="5"
        no-data-text="Não há alunos cadastrados."
        loading-text="Carregando..."
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "RA", value: "id" },
        { text: "NOME", value: "name" },
        { text: "EMAIL", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "DATA DE CRIAÇÃO", value: "createdAt", filterable: false },
        { text: "ÚLTIMA ATUALIZAÇÃO", value: "updatedAt", filterable: false },
        { text: "AÇÕES", value: "actions", sortable: false, filterable: false },
      ],
      students: [],
    };
  },
  created() {
    this.loadStudents();
  },
  methods: {
    loadStudents() {
      this.$http.get("http://localhost:5000/estudantes").then(function (data) {
        this.students = data.body;
      });
    },
    editItem(student) {
      // this.$router.push({ path: `/cadastro/${student.id}` });
      console.log("Editar" + student.id);
    },
    deleteItem(item) {
      // this.$http
      //   .delete("http://localhost:5000/estudantes/" + item.id)
      //   .then(function (data) {
      //     this.students = data.body;
      //   });
      console.log("Excluir" + item.id);
    },
  },
};
</script>