<script setup>
import { ref } from "vue";
import ImageDropzone from "./ImageDropzone.vue";
import {
  predict,
  generateStory,
  generateStoryChatGPT,
} from "../utils/model-utils";
import { useStore } from "vuex";

// backgroundColor="#98DDCA"
// backgroundColor="#D5ECC2"
// backgroundColor="#FFD3B4"

const store = useStore();
let isLoading = ref(false);

const handleSubmit = async (e) => {
  isLoading.value = true;
  e.preventDefault();

  const categories = {
    characters: store.state.images.characters,
    scenarios: store.state.images.scenarios,
    emotions: store.state.images.emotions,
  };

  console.log({ categories });

  const predictions = await Promise.all(
    Object.entries(categories).map(async ([key, value]) => {
      console.log({ key, value });
      if (value.length <= 0) return;
      return await predict({ images: value, model: key }); // Ensure await here
    })
  );

  predictions.forEach((p, idx) =>
    store.commit("insert", {
      payload: p,
      storeName: Object.keys(categories)[idx],
      type: "result",
    })
  );

  const results = store.getters.getResults; // Likely no need for await here

  const story = await generateStory({
    characters: results[0],
    emotions: results[2],
    scenarios: results[1],
  });

  store.commit("insert", { payload: story, type: "story" });

  isLoading.value = false;
};
</script>

<template>
  <form class="dropzones-form" :onSubmit="handleSubmit">
    <div class="dropzones-container">
      <button class="dropzones-form__btn">
        <p v-if="!isLoading">GENERAR HISTORIA</p>
        <div class="loader" v-else />
      </button>
      <ImageDropzone
        title="Personajes"
        storeName="characters"
        backgroundColor="#fff"
      />
      <ImageDropzone
        title="Emociones"
        storeName="emotions"
        backgroundColor="#fff"
      />
      <ImageDropzone
        title="Escenarios"
        storeName="scenarios"
        backgroundColor="#fff"
      />
    </div>
  </form>
</template>

<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 45px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%;
  }
  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%;
  }
  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%;
  }
}
.dropzones-container {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  overflow: auto;
  max-height: calc(100vh - 40px);

  background: lavenderblush;
  border-right: 2px solid #000;
}

.dropzones-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: calc(100vh - 40px);
  position: relative;
}

.dropzones-form__btn {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 6px;
  background-color: #ffaaa7;
  color: white;
  font-size: 1.2rem;
  display: grid;
  place-items: center;
}
</style>
