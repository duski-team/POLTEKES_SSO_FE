import { createApp } from "vue";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { VueReCaptcha } from "vue-recaptcha-v3";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import axios from "@/axios";
import moment from "moment";
import "moment/locale/id";
import ip from "@/ip";
import "bootstrap/dist/js/bootstrap.js";
import qs from "qs";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(bootstrap)
  .use(VueReCaptcha, { siteKey: "6LdGiIgfAAAAABQt0Cg0-iOrjyvsFGOd43NAqp1q" });

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.ip = ip;
app.config.globalProperties.qs = qs;

app.mount("#app");
