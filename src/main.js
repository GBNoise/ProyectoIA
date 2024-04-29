import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./stores/main.store";
import { LottieAnimation } from "lottie-web-vue";

const app = createApp(App);
app.use(store);
app.component("lottie", LottieAnimation);
app.mount("#app");
