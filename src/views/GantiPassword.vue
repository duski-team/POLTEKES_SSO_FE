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
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleInputpassword"
                v-model="state.password_lama"
                placeholder="Password Saat Ini"
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
                  <button class="btn btn-outline-primary" @click="kirim()">
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
  name: "1stLogin",
  data() {
    return {
      showing: false,
      username: "",
    };
  },
  setup() {
    const state = reactive({
      username: "",
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
  created() {
    this.username = localStorage.getItem("SSO_username");
  },
  methods: {
    async login() {
      let vm = this;
      vm.state.username = localStorage.getItem("SSO_username");
      let login = await vm.$axios.post("users/changepassword", vm.state);
      console.log(login);
      if (login.status == 200) {
        console.log("ok");
        this.$router.push({ path: "/login" });
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
