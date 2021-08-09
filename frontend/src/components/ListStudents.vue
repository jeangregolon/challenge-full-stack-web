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
        <v-btn href="/cadastro" rounded dark color="primary" class="ml-2"
          >Cadastrar Aluno</v-btn
        >
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
          <v-icon small @click="confirmDelete(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- Delete Dialog start -->
    <template>
      <v-dialog v-model="deleteDialog" max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Confirma a exclusão do cadastro de
          </v-card-title>
          <v-card-subtitle class="text-center text-h4">
            {{ studentToDelete.name }} ?
          </v-card-subtitle>
          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-btn color="error" @click="deleteItem(studentToDelete)">
              Confirmar
            </v-btn>
            <v-btn color="warning" @click="deleteDialog = false">
              cancelar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Delete Dialog end -->

    <!-- Loading Dialog start -->
    <template>
      <v-dialog v-model="loadingDialog" persistent max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Excluido cadastro...
          </v-card-title>
          <v-card-subtitle class="text-center pt-5">
            <v-icon x-large class="pr-3">mdi-loading mdi-spin</v-icon>
          </v-card-subtitle>
        </v-card>
      </v-dialog>
    </template>
    <!-- Loading Dialog end -->

    <!-- Invalid Dialog start -->
    <template>
      <v-dialog v-model="successDeleteDialog" max-width="680px">
        <v-card>
          <v-card-title class="justify-center text-h4">
            Cadastro excluído
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="successDeleteDialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- Invalid Dialog end -->
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
      studentToDelete: {},
      loadingDialog: false,
      deleteDialog: false,
      successDeleteDialog: false,
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
      this.$router.push({ name: "Cadastro", params: { student: student } });
    },
    confirmDelete(item) {
      this.studentToDelete = item;
      this.deleteDialog = true;
    },
    deleteItem() {
      this.deleteDialog = false;
      this.loadingDialog = true;
      this.$http
        .delete("http://localhost:5000/estudantes/" + this.studentToDelete.id)
        .then(function () {
          this.loadingDialog = false;
          this.loadStudents();
          this.successDeleteDialog = true;
        });
    },
  },
};
</script>