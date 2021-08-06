<template>
  <div class="cadastro">
    <h1 class="display-1 text-center my-3">Cadastro de aluno</h1>
    <create-students />
  </div>
</template>

<script>
import CreateStudents from "../components/CreateStudents.vue";

export default {
  components: {
    "create-students": CreateStudents,
  },
};
</script>
