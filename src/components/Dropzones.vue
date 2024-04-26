<script setup>
import { ref } from "vue";
import ImageDropzone from "./ImageDropzone.vue";
import { predict, generateStory } from "../utils/model-utils";
import { useStore } from "vuex";

const store = useStore();
let isLoading = ref(false);

const handleSubmit = async (e) => {
  isLoading.value = true;
  e.preventDefault();

  const categories = {
    characters: store.state.images.characters,
    scenarios: store.state.images.emotions,
    emotions: store.state.images.scenarios,
  };

  for (let [key, value] of Object.entries(categories)) {
    if (value.length <= 0) continue;
    let result = await predict({ images: value });

    store.commit("insert", {
      payload: result,
      storeName: key,
      type: "result",
    });
  }

  const results = store.getters.getResults;

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
      <ImageDropzone
        title="Personajes"
        backgroundColor="#98DDCA"
        storeName="characters"
      />
      <ImageDropzone
        title="Emociones"
        backgroundColor="#D5ECC2"
        storeName="emotions"
      />
      <ImageDropzone
        title="Escenarios"
        backgroundColor="#FFD3B4"
        storeName="scenarios"
      />
    </div>
    <button class="dropzones-form__btn">
      <p v-if="!isLoading">GENERAR HISTORIA</p>
      <div class="loader" v-else />
    </button>
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
  width: fit-content;
  height: 50vh;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.dropzones-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropzones-form__btn {
  width: 80%;
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
