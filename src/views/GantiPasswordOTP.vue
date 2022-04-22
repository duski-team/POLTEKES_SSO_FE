<template>
  <div
    class="container-fluid"
    :style="{
      'background-image': 'url(https://picsum.photos/seed/picsum/1000/1000)',
    }"
  >
    <h1 class="title text-center py-4">GANTI PASSWORD</h1>

    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2 text-center">
          <div class="card-body">
            <!-- <span class="card-number">01</span> -->

            <h5 class="card-title mb-4">Masukkan Password Lama</h5>
            <!-- <h5 class="card-title mb-4">
              Untuk Mendapatkan One Time Password Lupa Password
            </h5> -->

            <!-- <div class="mb-3">
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
            </div> -->
            <div class="mb-3">
              <label for="exampleInputpassword_baru" class="form-label"
                >Password Baru</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputpassword_baru"
                v-model="state.password_baru"
                @keydown.enter.prevent="login()"
              />
              <!-- <span v-if="v$.password_baru.$error">
                {{ v$.password_baru.$error }}
              </span> -->
            </div>

            <div class="mb-3">
              <label for="exampleInputpassword2" class="form-label"
                >Konfirmasi Password Baru</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputpassword2"
                v-model="state.password2"
                @keydown.enter.prevent="login()"
              />
            </div>
            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-8">
                  <button
                    href="#"
                    class="btn btn-outline-primary"
                    @click="login()"
                  >
                    GANTI PASSWORD
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
// import qs from "qs";
import { required, minLength, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
export default {
  setup() {
    const state = reactive({
      username:"",
      password_lama: "",
      password_baru: "",
      password2: "",
    });
    
    const rules = computed(() => {
      return {
        password_lama: {
          required,
        },
        password_baru: {
          required,
          minLength: minLength(10),
        },
        password2: {
          required,
          sameAs: sameAs(state.password_baru),
        },
      };
    });

    const v$ = useVuelidate(state, rules);

    return {
      v$,
      state,
    };
  },
  methods: {
    async login() {
      let vm = this;
      vm.state.username = localStorage.getItem('SSO_username')
      let login = await vm.$axios.post("users/changePasswordOTP", vm.state);
      console.log(login);
      if(login.status == 200){
        console.log('ok')
        if(login.data.message == 'sukses'){
          this.$router.push({path:"/"})
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
  max-width: 500px;
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
  max-width: 500px;
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

input {
  height: 50px;
  font-size: 20px;
  align-items: center;
  text-align: center;
}
label {
  font-weight: 500;
  font-size: 25px;
  letter-spacing: 2px;
}
</style>
