import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// import plugin
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify's CSS styles
import "vuetify/dist/vuetify.min.css";

import io from "socket.io-client";
// const socket = io("http://localhost:3002");
const socket = io(
  "http://ec2-13-209-87-250.ap-northeast-2.compute.amazonaws.com:3002/"
);
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

// const vuetify = new Vuetify()
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify,
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "mdi",
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
