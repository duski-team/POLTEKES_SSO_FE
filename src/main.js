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
import ip2 from "@/ip2";
import "bootstrap/dist/js/bootstrap.js";
import qs from "qs";
import ipsso from "@/axios/sso.js";
import ipsimadu from "@/axios/simadu.js";
import ipbilling from "@/axios/billing.js";
import VueCookies from "vue-cookies";

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
  .use(VueCookies, { expire: "7d" })
  .use(VueReCaptcha, {
    siteKey: "6LdGiIgfAAAAABQt0Cg0-iOrjyvsFGOd43NAqp1q",
    loaderOptions: { autoHideBadge: true },
  })
  .component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$axios = ipsso;
app.config.globalProperties.$axiosbilling = ipbilling;
app.config.globalProperties.$axiossimadu = ipsimadu;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.ip = ip;
app.config.globalProperties.ip2 = ip2;
app.config.globalProperties.qs = qs;
// treat all tags starting with 'ion-' as custom elements
// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.startsWith("C");
// }
app.config.warnHandler = (msg) => {
  if (msg.includes("If this is a native custom element")) {
    return "";
  }
};

app.mount("#app");
