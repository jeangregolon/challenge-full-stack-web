<template>
  <v-container>
    <v-data-table
      no-data-text="Não há alunos cadastrados."
      :headers="headers"
      :items="students"
      :items-per-page="5"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "RA", value: "id" },
        { text: "NOME", value: "name" },
        { text: "EMAIL", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "DATA CRIAÇÃO", value: "createdAt" },
        { text: "DATA ATUALIZAÇÃO", value: "updatedAt" },
        { text: "AÇÕES", value: "actions", sortable: false },
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
      this.$router.push({ path: `/cadastro/${student.id}` });
    },
    deleteItem(item) {
      this.$http
        .delete("http://localhost:5000/estudantes/" + item.id)
        .then(function (data) {
          this.students = data.body;
        });
    },
  },
};
</script>