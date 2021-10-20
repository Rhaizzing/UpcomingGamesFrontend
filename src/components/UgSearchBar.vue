<template>
  <div class="inputContainer">
    <input
      class="input"
      placeholder="Search Game"
      v-model="searchText"
      @input="emit('input', searchText)"
      @keypress.enter="emit('enterpress', searchText); searchText = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'input', text: string): void,
  (e: 'enterpress', text: string): void
}>();

const searchText = ref('');
</script>

<style scoped lang="scss">
.inputContainer {
  width: 100vw;
  margin-bottom: 2rem;

  .input {
    padding: 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 50%;
    height: 2rem;
  }

  .input::-webkit-input-placeholder {
    filter: opacity(0.4);
    background-size: 1rem;
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/5/55/Magnifying_glass_icon.svg");
    background-repeat: no-repeat;
    font-style: italic;
    padding-left: 2rem;
  }
}
</style>
