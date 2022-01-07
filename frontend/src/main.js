import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";

import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";
import "vuetify/dist/vuetify.min.css";

import io from "socket.io-client";
const socket = io("http://localhost:3002");
// const socket = io(
//   "http://ec2-13-209-87-250.ap-northeast-2.compute.amazonaws.com:3002/"
// );
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

// const vuetify = new Vuetify()
Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi",
});
Vue.use(VueMeta);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
