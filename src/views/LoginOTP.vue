<template>
  <div class="container-fluid">
    <!-- <h1 class="title text-center py-4">VERIFIKASI</h1> -->

    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2">
          <div class="card-body">
            <!-- <span class="card-number">01</span> -->
            <img class="mb-4" src="@/assets/logo-poltekes.jpg" alt="" />
            <p class="card-title mb-4">Verifikasi Kode Authentifikasi</p>
            <p class="card-email mb-4">Terkirim ke {{ data.username }}</p>

            <!-- <div v-if="show">
              <div :class="color" role="alert">
                <strong>Perhatian!</strong> {{ msg }}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div> -->

            <div class="mb-3">
              <!-- <label for="exampleInputpassword" class="form-label">OTP</label> -->
              <input
                type="password"
                class="form-control"
                id="exampleInputpassword"
                v-model="data.kode_otp"
                @keydown.enter.prevent="login()"
              />
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
                  <button
                    :disabled="!digits"
                    class="btn btn-outline-Success"
                    @click="login()"
                  >
                    KIRIM
                  </button>
                </div>
              </div>
            </div>
            <!-- <div><span>Belum Mendapatkan Kode OTP ?</span></div> -->
            <div>
              <span
                class="kirim_ulang text-primary text-bold"
                @click="kirimUlang()"
                >Kirim Ulang Kode
              </span>
              <span>dalam {{ countdown }} detik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      data: {
        username: "",
        kode_otp: "",
      },
      countdown: 30,
      show: false,
      msg: "",
      color: "",
    };
  },
  computed: {
    digits() {
      return this.data.kode_otp.length >= 6;
    },
  },
  created() {
    this.data.username = this.$store.state.username;
  },
  methods: {
    async login() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      let login = await vm.$axios.post("users/applyOTP", vm.data);
      console.log(login, "login otp");
      if (login.data.status == 201) {
        vm.$store.dispatch("set_alert_show_fail", login.data.message);
        vm.$store.dispatch("set_loading", false);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
        }, 2000);
      } else {
        vm.$store.dispatch("set_otp", vm.data.kode_otp);
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_success", login.data.message);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
          vm.$router.push({ path: "/gantiPassword2" });
        }, 2000);
      }
    },
    async kirimUlang() {
      if (this.countdown == 0) {
        let vm = this;
        vm.$store.dispatch("set_loading", true);
        let kirim = await vm.$axios.post("users/kirimUlangOTP", vm.data);
        console.log(kirim);
        vm.show = true;
        if (kirim.data.status == 200) {
          vm.$store.dispatch("set_loading", false);
          vm.$store.dispatch(
            "set_alert_show_success",
            "Kode OTP berhasil di kirim"
          );
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
        } else {
          vm.$store.dispatch("set_loading", false);
          vm.$store.dispatch("set_alert_show_fail", kirim.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
        }
      }
    },
  },
  watch: {
    countdown: {
      handler(val) {
        if (val > 0) {
          setTimeout(() => {
            this.countdown--;
          }, 1000);
        }
      },
      immediate: true,
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
  padding-top: 10%;
  /* background-color: red; */
  /* color: aqua; */
}

img {
  width: 50px;
  height: 50px;
}

.card {
  width: 90%;
  max-width: 440px;
  height: 492px;
  padding: 2rem 2.5rem;
  text-align: start;
  border-radius: 1rem;
}

.card-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 38px;
}

.card-email {
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
}

.btn {
  width: 100%;
  color: #ffffff;
  background-color: #027a48;
  border: solid 3px;
  border-radius: 10px;
}

input {
  height: 50px;
  font-size: 60px;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}
label {
  font-weight: 500;
  font-size: 30px;
  letter-spacing: 1rem;
}
.kirim_ulang {
  cursor: pointer;
}
.kirim_ulang:hover {
  transform: scale(1.1);
  color: aqua;
  font-weight: 500;
  cursor: pointer;
}
.alert {
  font-size: 13px;
}
</style>
