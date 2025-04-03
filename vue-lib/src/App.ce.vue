<script setup lang="ts">
import ChildWithStyleCe from "./ChildWithStyle.ce.vue";

console.log("I'm loaded");
</script>

<template>
  <div>
  <span class="a b">Hello World<child-with-style-ce></child-with-style-ce></span>
  <child-with-style-ce></child-with-style-ce>
  </div>
</template>

<style scoped>
.a {
  color: #ff0000;
}
</style>
