<script setup>
import { Dropzone } from "dropzone";
import { onBeforeMount, onMounted, watch, computed } from "vue";
import "dropzone/dist/dropzone.css";
import { v4 } from "uuid";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  title: String,
  backgroundColor: String,
  storeName: String,
  disabled: Boolean,
});

onBeforeMount(() => {
  Dropzone.autoDiscover = false;
});

const dropClass = "dropzone-" + v4();

onMounted(() => {
  const dropzone = new Dropzone("." + dropClass, {
    url: "/files/upload",
    maxFiles: 3,
    maxFilesize: 5, // Max file size in MB
    acceptedFiles: "image/*", // Accept only image files
    dictMaxFilesExceeded: "You can only upload up to 3 images.",
    dictInvalidFileType: "Only images are allowed.",
    dictFileTooBig:
      "File is too big ({{filesize}} MB). Max filesize: {{maxFilesize}} MB.",
    dictResponseError: "Server responded with {{statusCode}} code.",
    autoProccessQueue: false,
  });
  Dropzone.forElement(".dropzone").options.autoProcessQueue = false;

  const originalAddFile = dropzone.addFile.bind(dropzone);
  dropzone.addFile = (...params) => {
    if (dropzone.files.length < 3) {
      originalAddFile(...params);
    }
  };

  dropzone.on("addedfile", (file) => {
    store.commit("insert", {
      payload: file,
      storeName: props.storeName,
      type: "image",
    });
  });

  const files = computed(() => store.state.images[props.storeName]);

  watch(files, () => {
    console.log("here");
    if (files.value.length === 0) dropzone.removeAllFiles();
  });
});
</script>

<template>
  <div class="dropzone-container" :style="{ backgroundColor: backgroundColor }">
    <div class="dropzone" :class="dropClass">
      <h1>{{ title }}</h1>
      <div class="dz-message">
        <p>suelta las imagenes aqui!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropzone-container {
  border-radius: 2.5rem;
  background: white;
  min-width: 21.875rem;
  min-height: 18.875rem;
  width: 100%;
  max-width: 21.875rem;
  margin: auto;
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.1);
  border: 2px solid;
  user-select: none;
}
.dropzone {
  height: 100%;
  width: 100%;
  border-radius: 2.5rem;
  padding: 1rem;
  border-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
}

.dropzone:global(.dz-drag-hover) {
  border-style: dashed;
  border-color: var(--primary-color);
}

.dropzone-container :global(.dropzone.dz-started) {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  grid-template-rows: 1fr 1fr !important;
  /* grid-gap: 1rem; */
}
.dropzone-container :global(.dropzone .dz-preview) {
  margin: 0.5rem;
  justify-self: center;
  align-self: center;
}
.dropzone-container :global(.dropzone .dz-preview.dz-image) {
  background: transparent;
}

.dz-message {
  text-align: center;
  position: relative;
  max-width: 160px;
}
.dz-message h1 {
  font-size: 2.375rem;
  font-weight: bold;
  color: var(--title-color);
  text-align: left;
}

.dz-message p {
  font-weight: bold;
  text-transform: uppercase;
  text-wrap: break-word;
  opacity: 0.2;
}

.dropzone .comment {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-bottom: 0;
}
</style>
