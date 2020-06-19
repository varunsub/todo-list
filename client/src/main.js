import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import appsidebar from "./components/appsidebar";

Vue.config.productionTip = false;
Vue.use(vuetify);
new Vue({
  router,
  store,
  vuetify,
  components: appsidebar,
  render: h => h(App)
}).$mount("#app");
