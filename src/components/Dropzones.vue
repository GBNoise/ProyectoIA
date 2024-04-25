<script setup>
import ImageDropzone from "./ImageDropzone.vue";
</script>

<template>
  <form class="dropzones-form">
    <div class="dropzones-container">
      <ImageDropzone title="Personajes" backgroundColor="#98DDCA" />
      <ImageDropzone title="Emociones" backgroundColor="#D5ECC2" />
      <ImageDropzone title="Escenarios" backgroundColor="#FFD3B4" />
    </div>
    <button class="dropzones-form__btn">GENERAR HISTORIA</button>
  </form>
</template>

<style scoped>
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
}
</style>
