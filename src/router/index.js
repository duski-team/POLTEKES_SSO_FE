import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
// import Login from "../views/Login.vue";
import LoginOTP from "../views/LoginOTP.vue";
import LupaPassword from "../views/LupaPassword.vue";
import GantiPassword from "../views/GantiPassword.vue";
import GantiPasswordOTP from "../views/GantiPasswordOTP.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
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
    path: "/gantiPassword",
    name: "GantiPassword",
    component: GantiPassword,
  },
  {
    path: "/gantiPassword2",
    name: "GantiPassword",
    component: GantiPasswordOTP,
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

export default router;
