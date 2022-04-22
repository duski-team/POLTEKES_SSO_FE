<template>
  <div
    class="container-fluid"
    :style="{
      'background-image': 'url(https://picsum.photos/seed/picsum/1000/1000)',
    }"
  >
    <h1 class="title text-center py-4">SSO POLTEKES</h1>

    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2 text-center">
          <div class="card-body">
            <!-- <span class="card-number">01</span> -->

            <h5 class="card-title mb-4">Login</h5>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Alamat Email</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="data.username"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputpassword" class="form-label"
                >Password</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputpassword"
                v-model="data.password"
                @keydown.enter.prevent="login()"
              />
            </div>
            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-6">
                  <button
                    href="#"
                    class="btn btn-outline-primary"
                    @click="recaptcha()"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div class="row">
                <div
                  class="register col-5"
                  @click="$router.push({ path: '/register' })"
                >
                  Register
                </div>
                <div class="col-2">|</div>
                <div
                  class="lupa col-5"
                  @click="$router.push({ path: '/lupaPassword' })"
                >
                  Lupa Password
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Home",
  data() {
    return {
      data: {
        username: "",
        password: "",
        grant_type: "password",
        client_id: "a5e1397c-c227-42c4-b188-0297f9afa990",
        client_secret: "SSO",
      },
    };
  },
  methods: {
    async login() {
      let vm = this;
      let login = await vm.$axios.post("oauth/login", qs.stringify(vm.data), {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(login);
      if (login.data.status == 200) {
        localStorage.setItem("SSO_access_token", login.data.accessToken);
        localStorage.setItem("SSO_refresh_token", login.data.refreshToken);
        localStorage.setItem("SSO_client_id", login.data.user.id);
        if (login.data.user.userStatus == 0) {
          vm.$router.push({ path: "/loginOTP" });
        } else {
          vm.$router.push({ path: "/dashboard" });
        }
      } else if (login.data.status == 201) {
        console.log("error");
      }
    },
    async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha("login");
      if (token) {
        console.log("ok");
        this.login();
      }
      // Do stuff with the received token.
    },
  },
};
</script>

<style scoped>
.container-fluid {
  /* background-image: url("https://picsum.photos/seed/picsum/200/300"); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  /* background-color: red; */
  /* color: aqua; */
}

.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 4rem;
  text-align: center;
}

.card {
  width: 90%;
  max-width: 400px;
  padding: 5rem 2.5rem;

  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: rgba(225, 225, 225, 0.1);

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

.card:hover {
  width: 90%;
  max-width: 400px;
  padding: 5rem 2.5rem;

  border-radius: 1rem;
  border: 1px solid transparent;
  color: black;
  background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}
.btn {
  width: 100%;
}
.register:hover {
  font-size: 16px;
  font-weight: 500;
  color: blue;
}

.lupa:hover {
  font-size: 16px;
  font-weight: 500;
  color: blue;
}
</style>
