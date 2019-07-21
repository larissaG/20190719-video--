<template>
  <div id="app">
    <VotePage />
  </div>
</template>

<script>

import VotePage from "./components/VotePage.vue";
import fetch from "@/service";

export default {
  name: "app",
  components: {
    VotePage
  }
};

</script>

<style>
body{
  margin:0;
}
#app {
  position: relative;
  height: 100%;
  overflow:scroll;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
