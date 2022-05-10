<template>
  <div class="container-fluid">
    <!-- <h1 class="title text-center py-4">SSO POLTEKES</h1> -->
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2 text-center">
          <div class="card-body">
            <!-- <span class="card-number">01</span> -->
            <img src="@/assets/logo-poltekes.jpg" alt="" />

            <h5 class="SSO mb-4">Single Sign On (SSO)</h5>
            <h5 class="card-title mb-4">Poltekes Semarang</h5>
            <div v-if="show">
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>Perhatian!</strong> Username salah atau tidak terdaftar
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div class="mb-3 mt-4">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="data.username"
                placeholder="Username/e-mail"
              />
            </div>
            <div class="mb-3">
              <!-- <label for="exampleInputpassword" class="form-label"
                >Password</label
              > -->
              <input
                type="password"
                class="form-control"
                id="exampleInputpassword"
                v-model="data.password"
                placeholder="password"
                @keydown.enter.prevent="login()"
              />
            </div>
            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
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

            <div class="register mt-3">
              <div class="row register=box">
                <div class="col-6">Belum Memiliki Akun?</div>
                <div
                  class="register-text col-6"
                  @click="$router.push({ path: '/register' })"
                >
                  Daftar Sekarang
                </div>
                <!-- <div class="col-2">|</div>
                <div
                  class="lupa col-5"
                  @click="$router.push({ path: '/lupaPassword' })"
                >
                  Lupa Password
                </div> -->
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
        client_secret: "SSO",
        client_id: "a5e1397c-c227-42c4-b188-0297f9afa990",
      },
      variant: "",
      show: false,
      msg: "",
    };
  },
  methods: {
    async login() {
      let vm = this;
      try {
        let login = await vm.$axios.post("oauth/login", qs.stringify(vm.data), {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        console.log(login);
        if (login.status == 200) {
          localStorage.setItem("SSO_access_token", login.data.accessToken);
          localStorage.setItem("SSO_refresh_token", login.data.refreshToken);
          localStorage.setItem("SSO_user_id", login.data.user.id);
          localStorage.setItem("SSO_client_id", login.data.client.id);
          localStorage.setItem("SSO_username", login.data.user.username);
          localStorage.setItem('expired', login.data.accessTokenExpiresAt)

          if (login.data.user.user_status == 0) {
            vm.$router.push({ path: "/1stlogin" });
          } else {
            vm.$router.push({ path: "/dashboard" });
          }
        } else {
          console.log("error");
        }
      } catch (error) {
        if (error) {
          console.log(error)
          this.show = true;
        }
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
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  /* margin: 0;
    padding: 0; */
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.container-fluid {
  /* background-image: url("https://picsum.photos/seed/picsum/200/300"); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  background-color: #ffffff;
  padding:7%
  /* color: aqua; */
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
}
.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  font-weight: 400;
  color: #667085;
}

.alert {
  font-size: 10px;
  color: red;
}

.card {
  width: 90%;
  max-width: 440px;
  padding: 5rem 2.5rem;
  height: 696px;

  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: rgba(225, 225, 225, 0.1);

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  /* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
}

.card:hover {
  width: 90%;
  max-width: 440px;
  padding: 5rem 2.5rem;
  height: 696px;

  border-radius: 1rem;
  border: 1px solid transparent;
  color: black;
  background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  /* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
}
.btn {
  width: 100%;
  background-color: #027a48;
  color: #ffffff;
}
.register {
  font-size: 14px;
}

.register-box {
  justify-content: space-between;
}
.register-text {
  color: #027a48;
}
/* .register:hover {
  transform: scale(1.1);
  font-size: 16px;
  font-weight: 500;
  color: blue;
} */

.lupa:hover {
  transform: scale(1.1);
  font-size: 16px;
  font-weight: 500;
  color: blue;
}
</style>
