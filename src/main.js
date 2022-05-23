import { createApp } from "vue";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import { VueReCaptcha } from "vue-recaptcha-v3";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
// import axios from "@/axios";
import moment from "moment";
import "moment/locale/id";
import ip from "@/ip";
import "bootstrap/dist/js/bootstrap.js";
import qs from "qs";
import instance from "@/axios/index.js"

/* import the fontawesome core */
import { library, dom } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far);
dom.watch();

const app = createApp(App)
  .use(store)
  .use(router)
  .use(bootstrap)
  .use(VueReCaptcha, { siteKey: "6LdGiIgfAAAAABQt0Cg0-iOrjyvsFGOd43NAqp1q" });

app.config.globalProperties.$axios = instance;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.ip = ip;
app.config.globalProperties.qs = qs;
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
