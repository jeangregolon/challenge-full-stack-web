<template>
  <div class="cadastro">
    <h1 class="display-1 text-center my-3">Cadastro de aluno</h1>
    <student-form />
  </div>
</template>

<script>
import StudentForm from "../components/StudentForm.vue";

export default {
  components: {
    "student-form": StudentForm,
  },
};
</script>
