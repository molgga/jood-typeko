<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { separateChar } from '@jood/typeko-core';

export default defineComponent({
  setup() {
    console.log('Hello', separateChar('푸'));
    console.log('Hello', separateChar('핧'));
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
