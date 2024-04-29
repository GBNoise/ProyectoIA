<script setup>
import Dropzones from "./Dropzones.vue";
import Chatbox from "./Chatbox.vue";
import { watch, ref } from "vue";

const webapp = ref(null);

watch(webapp, () => {
  //   if (!webapp.value) return;
  //   webapp.value.style.animation = "";
  //   webapp.value.style.backgroundColor = "red";
});
</script>

<template>
  <div class="webapp" ref="webapp">
    <Dropzones />
    <Chatbox />
  </div>
</template>

<style scoped>
.webapp {
  z-index: 100;
  animation: into-sight 0.2s linear forwards;
  position: relative;
}

.webapp > * {
  z-index: 120;
}

.my-lottie {
  top: 0;
}
</style>
