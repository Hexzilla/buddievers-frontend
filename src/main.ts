import Vue from 'vue'
import App from './App.vue'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "./icons";

import store from "./store";
import router from './router'


Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultIconComponent: "vue-fontawesome",
  defaultFieldLabelPosition: "inside",
});
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
