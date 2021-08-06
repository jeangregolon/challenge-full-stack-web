<template>
  <nav>
    <v-toolbar height="70" class="blue lighten-2 d-flex justify-center">
      <img src="/assets/logo.png" alt="Grupo A Educação" height="60" />
    </v-toolbar>
    <v-navigation-drawer app permanent expand-on-hover height="100vh">
      <v-list nav dense>
        <v-list-item class="grey lighten-2 nav-title">
          <v-list-item-icon>
            <v-icon>mdi-school</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Módulo Acadêmico</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Página Inicial</v-list-item-title>
        </v-list-item>

        <v-list-item router to="/consulta">
          <v-list-item-icon>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Consulta de Alunos</v-list-item-title>
        </v-list-item>

        <v-list-item router to="/cadastro">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cadastro de Aluno</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<style scoped>
.nav-title {
  margin-top: 70px;
}
</style>