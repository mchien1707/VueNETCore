<template>
  <NavigationBar />
  <div class="container mb-5 user-onboard">
    <router-view />
  </div>
</template>

<script lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: {
    NavigationBar,
  },
};
</script> 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media only screen and (min-width: 992px) {
  .user-onboard {
    width: 800px !important;
  }
}
</style>
