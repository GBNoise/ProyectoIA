<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import * as lt from "../assets/lottiebook.json";

const store = useStore();

const story = computed(() => store.getters.getStories[0]);
const details = computed(() => store.state.results);

const isShowStory = ref(true);
const isShowDetails = ref(false);

const tabs = [
  {
    title: "Cuento",
    onClick: () => {
      isShowDetails.value = false;
      isShowStory.value = true;
    },
  },
  {
    title: "Detalles",
    onClick: () => {
      isShowStory.value = false;
      isShowDetails.value = true;
    },
  },
];
</script>

<template>
  <div class="chatbox">
    <div class="chatbox-tabs">
      <span class="chatbox-tabs__tab" v-for="tab of tabs" @click="tab.onClick">
        {{ tab.title }}
      </span>
    </div>
    <div class="story-container">
      <p class="story-text" v-if="story && isShowStory">
        {{ story }}
      </p>
      <div class="story-text" v-if="details && isShowDetails">
        "Details"
        <span v-for="[key, value] of Object.entries(details)">
          {{ key }} : {{ value }}
          <span v-for="val of value">{{ key }}: {{ val }}</span>
        </span>
      </div>
      <lottie
        class="my-lottie"
        :animation-data="lt"
        :loop="true"
        :auto-play="true"
      ></lottie>
    </div>
  </div>
</template>

<style scoped>
.chatbox {
  min-width: calc(100% - 400px);
  height: 100%;
  max-width: 1200px;
  position: absolute;
  right: 0;
  top: 0;
}

.my-lottie {
  top: 0;
  opacity: 0.1;
  width: 100%;
  pointer-events: none;
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
  background: #fff;
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
