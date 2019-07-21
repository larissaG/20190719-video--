import Vue from "vue";
import App from "./App.vue";
import utils from "@/utils";
import "lib-flexible";

Vue.config.debug = process.env.NODE_ENV !== "production";
Vue.config.productionTip = false;
Vue.use(utils);

new Vue({
  render: h => h(App)
}).$mount("#app");
