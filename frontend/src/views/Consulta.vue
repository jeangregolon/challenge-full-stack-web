<template>
  <div class="consulta">
    <h1 class="display-1 text-center my-3">Consulta de alunos</h1>
    <list-students />
  </div>
</template>

<script>
import ListStudents from "../components/ListStudents.vue";

export default {
  components: {
    "list-students": ListStudents,
  },
};
</script>