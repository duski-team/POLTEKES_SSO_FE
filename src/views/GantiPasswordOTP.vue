<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="card cb1 m-2">
          <div class="card-body">
            <img class="mb-4" src="@/assets/logo-poltekes.jpg" alt="" />

            <p>{{ username }}</p>

            <h5 class="card-title mb-4">Update Password Anda</h5>
            <h5 class="card-instruction mb-4">
              You need to update your password because this is the first time
              you are signing in or because your password has expired.
            </h5>
            <div v-if="show">
              <div :class="color" role="alert">
                <strong>Perhatian!</strong> {{ msg }}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleInputpassword"
                v-model="state.password_baru"
                placeholder="Password Baru"
                @keydown.enter.prevent="kirim()"
              />
              <!-- <span v-if="showing" class="text-danger fst-italic mt-2"
                >"{{ msg }}</span
              > -->
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleInputpassword"
                v-model="state.password2"
                placeholder="Konfirm Password"
                @keydown.enter.prevent="kirim()"
              />
              <!-- <span v-if="showing" class="text-danger fst-italic mt-2"
                >"{{ msg }}</span
              > -->
            </div>
            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
                  <button
                    class="btn btn-outline-success"
                    @click="kirim()"
                    :disabled="!isValid"
                  >
                    Update Password dan Sign in
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
  name: "changePassword",
  data() {
    return {
      show: false,
      username: "",
      msg: "",
      color: "",
    };
  },
  setup() {
    const state = reactive({
      username: "",
      password_baru: "",
      password2: "",
      kode_otp: "",
    });

    const rules = computed(() => {
      return {
        password_baru: {
          required,
          minLength: minLength(3),
        },
        password2: {
          required,
          sameAs: sameAs(state.password_baru),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    return {
      v$,
      state,
      rules,
    };
  },
  computed: {
    formString() {
      return JSON.stringify(this.state);
    },
    isValid() {
      return !this.v$.$invalid;
    },
    isDirty() {
      return this.v$.$anyDirty;
    },
  },
  created() {
    this.username = localStorage.getItem("username");
  },
  methods: {
    async kirim() {
      let vm = this;
      vm.state.username = localStorage.getItem("username");
      vm.state.kode_otp = localStorage.getItem("kode_otp");
      let login = await vm.$axios.post("users/changePasswordOTP", vm.state);
      console.log(login);
      if (login.data.status == 200) {
        if (login.data.status == "sukses") {
          vm.show = true;
          vm.msg = login.data.message;
          vm.color = "alert alert-success alert-dismissible fade show";
          setTimeout(() => {
            vm.show = false;
            this.$router.push({ path: "/" });
          }, 4000);
        } else {
          vm.show = true;
          vm.msg = login.data.message;
          vm.color = "alert alert-danger alert-dismissible fade show";
          setTimeout(() => {
            vm.show = false;
          }, 4000);
        }
      } else {
        vm.show = true;
        vm.msg = login.data.message;
        vm.color = "alert alert-danger alert-dismissible fade show";
        setTimeout(() => {
          vm.show = false;
        }, 4000);
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
  padding: 10%;
  /* background-color: red; */
  /* color: aqua; */
}

.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 30px;
  text-align: center;
}

img {
  height: 50px;
  width: 50px;
}

.card {
  width: 90%;
  max-width: 480px;
  height: 621px;
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
</style>
