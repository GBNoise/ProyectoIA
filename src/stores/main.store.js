import { createStore } from "vuex";

const store = createStore({
  state: {
    images: {
      characters: [],
      scenarios: [],
      emotions: [],
    },
    results: {
      characters: [],
      scenarios: [],
      emotions: [],
    },
    stories: [],
  },

  getters: {
    getResults(state) {
      return [
        state.results.characters,
        state.results.scenarios,
        state.results.emotions,
      ];
    },
    getStories(state) {
      return [...state.stories];
    },
  },

  mutations: {
    insert(state, { payload, storeName, type }) {
      switch (type) {
        case "image":
          state.images[storeName] = [...state.images[storeName], payload];
          break;
        case "result":
          state.results[storeName] = [...state.results[storeName], ...payload];
          break;
        case "story":
          console.log({ payload });
          state.stories = [...state.stories, payload];
          break;
      }
    },
  },
});

export default store;
