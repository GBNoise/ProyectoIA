<script setup>
import { useStore } from "vuex";
const store = useStore();

const handleReset = () => {
  console.log("resetting");
  store.commit("insert", { type: "resetState" });
};
</script>

<template>
  <nav>
    <span class="nav-title"> StoryAI </span>
    <ul class="options">
      <li @click="handleReset" v-if="store.state.isAppInitialized">
        Reiniciar
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  min-height: 50px;
  background: lavenderblush;
  border-bottom: 2px solid #000;
  font-weight: bolder;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 9999;
  justify-content: space-between;
}
</style>
