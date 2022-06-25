<template>
  <nav class="navi">
    <a class="btn" href="/">home</a>
    <a class="btn" href="/typist">typist</a>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.navi {
  display: flex;
  align-items: center;
  padding: 10px;
  .btn {
    display: flex;
    margin: 0 6px;
    padding: 5px 1px;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #333;
    &:hover {
      background: #f9f9f9;
    }
  }
}
</style>
