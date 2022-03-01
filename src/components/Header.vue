<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>This is a util lib demo for Vue.js</h3>
  </div>
</template>

<style scoped></style>
