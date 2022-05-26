<template>
  <div>
    <!-- {{$store.state.sso_access_token}} {{$store.state.expired}} -->
    <div class="page" v-if="showSpinner">
      <div class="spinner-border" variant="primary" key="primary">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <router-view />
  </div>
  <div>
    <Alert />
  </div>
</template>

<script>
// import { setToken } from "@/axios/index.js";
import Alert from "@/components/alert";
export default {
  components: {
    Alert,
  },
  mounted() {
    // setToken(localStorage.getItem("SSO_access_token"));
  },
  computed: {
    showSpinner() {
      return this.$store.state.loading;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #e5e5e5;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.page {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999999999;
  overflow: hidden;
  background: transparent;
  backdrop-filter: blur(0.09rem);
}

.spinner-border {
  font-size: 10px;
  border-top: 0.8em solid rgba(218, 219, 223, 1);
  border-right: 0.8em solid rgba(218, 219, 223, 1);
  border-bottom: 0.8em solid rgba(218, 219, 223, 1);
  border-left: 0.8em solid rgba(58, 166, 165, 1);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
.spinner-border,
.spinner-border:after {
  border-radius: 50%;
  width: 8em;
  height: 8em;
  display: block;
  position: absolute;
  top: 50%;
  margin-top: -4.05em;
}
</style>
