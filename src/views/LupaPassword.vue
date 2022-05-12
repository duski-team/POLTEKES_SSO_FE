<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2">
          <div class="card-body">
            <!-- <span class="card-number">01</span> -->
            <img class="mb-4" src="@/assets/logo-poltekes.jpg" alt="" />

            <h5 class="card-title mb-4">Lupa Password ?</h5>
            <h5 class="card-instruction mb-4">
              Masukkan Email anda yang terdaftar. Kami akan kirimkan Instruksi
              Ke Email
            </h5>

            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleInputpassword"
                v-model="data.username"
                placeholder="E-mail"
                @keydown.enter.prevent="kirim()"
              />
              <span v-if="showing" class="text-danger fst-italic mt-2"
                >"{{ msg }}</span
              >
            </div>
            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
                  <button
                    class="btn btn-outline-success"
                    @click="kirim()"
                  >
                    Kirim Permintaan Reset Password
                  </button>
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
export default {
  name: "Home",
  data() {
    return {
      data: {
        username: "",
      },
      msg: "",
      showing: false,
    };
  },
  methods: {
    async kirim() {
      let vm = this;
      let login = await vm.$axios.post("users/kirimUlangOTP", vm.data);
      console.log(login);
      if (login.data.status == 201) {
        vm.msg = login.data.message;
        vm.showing = true;
        setTimeout(() => {
          vm.showing = false;
        }, 4000);
      } else {
        localStorage.setItem("username", this.data.username);
        this.$router.push({ path: "/OTP" });
      }
    },
    async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha("login");
      if (token) {
        this.kirim();
      }
      // Do stuff with the received token.
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
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 10%;
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

img {
  height: 50px;
  width: 50px;
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
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
}
.card-instruction {
  font-weight: 200;
  font-size: 14px;
  line-height: 24px;
}
.btn {
  margin-top: 25px;
  width: 100%;
  height: 44px;
  background-color: #027a48;
  color: #ffffff;
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
