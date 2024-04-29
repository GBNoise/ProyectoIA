<script setup>
import ImageDropzone from "../components/ImageDropzone.vue";
import * as lt from "../assets/lottie.json";
import { useStore } from "vuex";
import { watch, ref, computed } from "vue";

const defaultOptions = {
  animationData: lt.default,
};

const store = useStore();

const handleAppInitialization = () => {
  store.commit("insert", { type: "initApp" });
};

const home = ref(null);
const isActive = computed(() => store.getters.getAppState);

watch(isActive, () => {
  console.log("value changed");
  if (!home.value) return;
  home.value.style.position = "absolute";
  home.value.style.animation = "out-of-sight .2s linear forwards";
});
</script>

<template>
  <div className="home-container" ref="home">
    <span class="home-title">
      <span class="home-title__first">
        GENERADOR DE&nbsp;
        <p class="home-title__first-p">CUENTOS</p>
      </span>
      <p>IMPULSADO POR</p>
      <p>INTELIGENCIA ARTIFICIAL</p>
      <p>Tus Imágenes, Nuestras Historias: Narración con IA a tu Alcance</p>
    </span>
    <div class="home-middle">
      <!-- <ImageDropzone /> -->
      <div class="btn-container">
        <button @click="handleAppInitialization">INICIAR</button>
      </div>

      <!-- <div class="home-middle__card">
        <span class="home-middle__card-span">
          <p class="home-middle__card-span__title">
            Abraza la magia de la narración impulsada por IA
          </p>
          <p>
            Con nuestro generador de cuentos con IA, puedes combinar sin
            problemas tu inspiración visual con las infinitas posibilidades de
            la creación narrativa impulsada por IA. Simplemente sube una imagen
            que despierte tu imaginación, y nuestros algoritmos avanzados
            analizarán sus elementos visuales, emociones y temas para crear una
            historia cautivadora que refleje la esencia de tu imagen elegida.
          </p>
        </span>
      </div> -->
    </div>
    <lottie
      class="my-lottie"
      :animation-data="lt"
      :loop="true"
      :auto-play="true"
    ></lottie>
  </div>
</template>

<style scoped>
.home-container > * {
  z-index: 1;
}

.home-middle {
  width: 100%;
  min-height: calc(100% - 220px);
  z-index: 100;
}

.home-title {
  z-index: 100;
}

.btn-container button {
  width: 200px;
  height: 40px;
  outline: none;
  border: none;
  background: rgb(172, 129, 241);
  border: 2px solid black;
  border-radius: 4px;
  font-size: 1rem;
  color: white;
  margin-bottom: 450px;
}

.dropzone-container {
  position: absolute;
  left: 300px;
}

.home-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-middle__card {
  border-radius: 8px;
  background: #0e0e0e;
  min-width: 600px;
  height: 400px;
  width: 100%;
  max-width: 21.875rem;
  margin: auto;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(128, 128, 128, 0.726);
  color: #fff;
  padding: 20px;
  position: absolute;
  right: 40px;
}

.home-middle__card-span__title {
  font-size: 1.5rem;
  font-weight: bolder;
}

.home-middle__card-span :nth-child(2) {
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.1rem;
}

.home-middle__card span {
  display: flex;
  flex-direction: column;
  position: relative;
}

.home-container {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding-top: 150px;
}

.home-title__first {
  display: flex;
  width: 100%;
}

.home-title__first-p {
  color: rgba(180, 137, 248, 0.74);
}

.home-container .home-title {
  display: flex;
  position: relative;
  width: 1344px;
  min-height: 200px;
  justify-content: center;
  align-items: center;
}

.home-container > span > * {
  position: absolute;
}

button,
.home-title * {
  font-family: "Fugaz One";
}

.home-container > span > :nth-child(1) {
  font-size: 4rem;
  top: 0px;
  left: 200px;
}

.home-title > :nth-child(2) {
  font-size: 2rem;
  top: 80px;
  left: 300px;
  color: white;
  -webkit-text-stroke: 2px black;
}

.home-container span > :nth-child(3) {
  font-size: 3.2rem;
  top: 80px;
  left: 570px;
}

.home-container > span > :last-child {
  color: rgba(0, 0, 0, 0.4);
  bottom: 20px;
}
</style>
