<template>
  <div id="app">
    <VotePage />
  </div>
</template>

<script>
import VotePage from "./components/VotePage.vue";
import fetch from "@/service";
import FastClick from "fastclick";

export default {
  name: "app",
  components: {
    VotePage
  },
  mounted() {
    FastClick.attach(document.body);
  }
};
</script>

<style>
body {
  margin: 0;
  height: 100%;
}
html {
  height: 100%;
  background: #000;
}
#app {
  position: relative;
  height: 100%;
  overflow: scroll;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-overflow-scrolling: touch;
}
</style>
