<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="cb1 m-2 text-center">
          <img src="@/assets/email.jpg" alt="" />
          <h5 class="SSO mb-4">Periksa Email Anda</h5>
          <!-- <h5 class="card-title mb-4 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </h5> -->
          <h5 class="card-title mb-4 mt-4">
            <p class="kirim" v-if="countdown > 0">
              Klik Disini <span v-if="countdown > 0">dalam {{ countdown }} detik</span>
            </p>
            <p class="kirim" v-else @click="kirim()">
              Klik Disini
            </p>
            Jika anda tidak menerima email konfirmasi pendaftaran SSO di email pribadi
            yang sudah terdaftar di SSO
          </h5>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-4">
      <button class="col-md-6 btn-green" @click="login()" :disabled="busy">
        <p>Update Password Anda dan Login</p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["state"],
  data() {
    return {
      msg: "",
      busy: false,
      countdown: 30,
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$router.push({ path: "/" });
    },
    async kirim() {
      let vm = this;
      this.$store.dispatch("set_loading", true);
      let kirim = await vm.$axios.post("users/kirimUlangPassword", vm.state);
      // console.log(kirim);
      vm.countdown = 60;
      if (kirim.data.status == 201) {
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_success", kirim.data.message);
        // vm.showing = true;
        // setTimeout(() => {
        //   vm.showing = false;
        // }, 4000);
      } else {
        this.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_success", kirim.data.message);
        localStorage.setItem("username", this.state.username);
        // this.$router.push({ path: "/" });
      }
    },
  },
  watch: {
    countdown: {
      handler(val) {
        console.log(val)
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
  padding: 75px 25px 75px 25px;
  /* background-color: red; */
  /* color: aqua; */
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
  margin-top: 20px;
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

.btn-green {
  margin-top: 20px;
  width: 362px;
  height: 44px;
  background-color: #027a48;
  color: #ffffff;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
}

.kirim {
  font-weight: 700;
  color: #1c3aa9;
  cursor: pointer;
}

.kirim:disabled {
  font-weight: 700;
  color: grey;
  cursor: pointer;
}
</style>
