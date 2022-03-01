<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
</script>

<template>
  <header>
    <div>
      <Header msg="Vue Utils" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
