import Vue from 'vue'
import App from './App.vue'
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "./icons";

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// // Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from "./store";
import router from './router'


Vue.config.productionTip = false


// // Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// // Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

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
