<template>
  <div
    class="container-fluid"
    :style="{
      backgroundImage: `url(${require('@/assets/gedung.jpeg')})`,
    }"
  ></div>
  <!-- <h1 class="title text-center py-4">SSO POLTEKES</h1> -->
  <div class="row bg-text">
    <div class="col d-flex justify-content-center">
      <div class="card cb1 m-2 text-center">
        <div class="card-body">
          <!-- <span class="card-number">01</span> -->
          <img src="@/assets/logo-poltekes.jpg" alt="" />

          <h5 class="SSO mb-4">{{ client.nama_client }}</h5>
          <h5 class="card-title mb-4">Poltekes Semarang</h5>
          <!-- <div v-if="show">
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
            </div> -->
          <!-- </div> -->
          <div class="mb-3 mt-4">
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="data.username"
              placeholder="Username / e-mail"
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
          <div class="lupa" @click="$router.push('/lupaPassword')">
            <p></p>
            <p>Forgot Password</p>
          </div>
          <div class="mb-3 mt-3">
            <div class="d-flex justify-content-center">
              <div class="col-12">
                <button
                  href="#"
                  class="btn btn-outline-primary"
                  @click="recaptcha()"
                >
                  L o g i n
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
      client: {},
    };
  },
  created() {
    this.$store.dispatch("set_loading", false);
    let x = this.$route.params.client_id;
    this.clientApp(x);
  },
  methods: {
    async login() {
      let vm = this;
      this.$store.dispatch("set_loading", true);
      try {
        let login = await vm.$axios.post("oauth/login", qs.stringify(vm.data), {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        });
        console.log(login);
        if (login.status == 200) {
          vm.$store.dispatch("set_alert_show_success", "Sukses");
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 4000);
          // console.log(this.client.redirect_uri);
          window.open(
            this.client.redirect_uri + "?token=" + login.data.accessToken + "&refresh=" + login.data.refreshToken
          );
          this.$store.dispatch("set_loading", false);
        } else {
          vm.$store.dispatch("set_alert_show_fail", login.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
          this.$store.dispatch("set_loading", false);
        }
      } catch (error) {
        if (error) {
          vm.$store.dispatch("set_alert_show_fail", error.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
          this.show = true;
          this.$store.dispatch("set_loading", false);
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
    async clientApp(x) {
      console.log(x);
      let client = await this.$axios.get("client/detailsById/" + x);
      console.log(client);
      this.client = client.data.data[0];
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
  /* background-image: url('@/assets/gedung.jpeg') */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  /* background-color:  rgba(225, 225, 225, 0.1); */
  padding: 7%;
  filter: blur(1rem);

  /* color: aqua; */
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
  letter-spacing: 2px;
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
  /* background-color: rgba(225, 225, 225, 0.1); */
  background-color: #ffffff;

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
  background-color: #ffffff;
  /* background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  ); */

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
}
.btn {
  width: 100%;
  background-color: #027a48;
  color: #ffffff;
  letter-spacing: 1px;
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

.lupa {
  font-size: 14px;
  font-weight: 500;
  color: #d92d20;
  display: flex;
  justify-content: space-between;
  line-height: 16px;
}

.lupa:hover {
  transform: scale(1.01);
  font-size: 14px;
  font-weight: 500;
  color: #d92d20;
  line-height: 16px;
}
</style>
