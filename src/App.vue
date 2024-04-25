<script setup>
import Dropzones from "./components/Dropzones.vue";
import Chatbox from "./components/Chatbox.vue";
</script>

<template>
  <div class="app-wrap">
    <Dropzones />
    <Chatbox />
  </div>
</template>

<style scoped>
.app-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
