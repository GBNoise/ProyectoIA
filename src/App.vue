<script setup>
import Nav from "./components/Nav.vue";
import Home from "./pages/Home.vue";
import Webapp from "./components/Webapp.vue";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import * as lt from "./assets/lottiedragon.json";

const store = useStore();
const appState = computed(() => store.getters.getAppState);
const isHomeActive = ref(true);
watch(appState, () => {
  setTimeout(() => {
    isHomeActive.value = false;
  }, 1000);
});
</script>

<template>
  <div class="app-wrap">
    <Nav />
    <Home v-if="isHomeActive" />
    <!-- <span>
      <lottie
        class="dragon-lottie my-lottie"
        :animation-data="lt"
        :loop="true"
        :auto-play="true"
      ></lottie>
    </span> -->
    <Webapp v-if="appState" />
  </div>
</template>

<style scoped>
.app-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
}
</style>
