<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const story = computed(() => store.getters.getStories[0]);

console.log({ storyFromhere: story });
</script>

<template>
  <div class="chatbox">
    <div class="chatbox-tabs">
      <span class="chatbox-tabs__tab">Cuento #1</span>
      <span class="chatbox-tabs__tab">Cuento #2</span>
      <span class="chatbox-tabs__tab">Cuento #3</span>
    </div>
    <div class="story-container">
      <p class="story-text" v-if="story">
        {{ story }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.chatbox {
  width: 100%;
  height: 40vh;
  max-width: 1200px;
  background: #fafafa;
  border-radius: 10px 10px 0 0;
  border: solid 1px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.story-text {
  padding: 20px;
  font-size: 1.5rem;
}

.story-container {
  width: 100%;
  height: calc(100% - 40px);
  max-height: 100%;
  overflow: auto;
}

.chatbox-tabs {
  width: 100%;
  border-bottom: 1px solid;
  height: 40px;
  display: flex;
}
.chatbox-tabs__tab {
  display: flex;
  width: fit-content;
  padding: 0 10px 0 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px 0 0 0;
  font-weight: bold;
  cursor: pointer;
}

.chatbox-tabs__tab:hover {
  background: rgba(200, 200, 200, 0.2);
}
</style>
