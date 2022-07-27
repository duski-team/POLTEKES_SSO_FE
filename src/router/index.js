import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import HomeClient from "../views/HomeClient.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Register from "../views/Register/Register.vue";
import Profil from "../views/Edit/EditProfil.vue";
// import Login from "../views/Login.vue";
import LoginOTP from "../views/LoginOTP.vue";
import LupaPassword from "../views/LupaPassword.vue";
import GantiPassword from "../views/GantiPassword.vue";
import GantiPasswordOTP from "../views/GantiPasswordOTP.vue";
import store from "@/store/index.js";
import payment from "../views/Payment/payment.vue";
import kebijakan from "../views/kebijakan.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/client_login/:client_id",
    name: "HomeClient",
    component: HomeClient,
    beforeRouteUpdate(to, from, next) {
      console.log(to);
      if (to.path == "/client_login/:client_id") {
        next({
          path: "/client_login/",
        });
      }
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/OTP",
    name: "OTP",
    component: LoginOTP,
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: Login,
  // },
  {
    path: "/lupaPassword",
    name: "LupaPassword",
    component: LupaPassword,
  },
  {
    path: "/1stlogin",
    name: "1stLogin",
    component: GantiPassword,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/gantiPassword2",
    name: "GantiPassword",
    component: GantiPasswordOTP,
    meta: {
      requiresOTP: true,
    },
  },
  {
    path: "/profil",
    name: "Edit Profil",
    component: Profil,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/payment",
    name: "Payment",
    component: payment,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/kebijakan",
    name: "User Agrement",
    component: kebijakan,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function (to, from, next) {
  let token = store.state.sso_access_token != null;
  let otp = store.state.kode_otp;
  let too = to.path;
  if (too == "/logout") {
    window.localStorage.removeItem("vuex");
    next({ path: "/" });
  }
  if (!token) {
    if (to.meta.requiresAuth && too != "/") {
      next({ path: "/" });
    } else {
      if (to.meta.requiresOTP) {
        if (otp) {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  } else {
    if (too == "/logout") {
      next({ path: "/" });
    } else {
      if (to.meta.requiresAuth) {
        next();
      } else {
        next({ path: "/dashboard" });
      }
    }
  }
});

export default router;
