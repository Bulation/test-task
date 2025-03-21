<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
import { ErrorComponent } from './shared/error';
const error = ref(false);

onErrorCaptured(() => {
  error.value = true;
});
</script>

<template>
  <div v-if="error">
    <ErrorComponent />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>