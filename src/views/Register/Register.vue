<template>
  <div class="container">
    <div class="row d-flex">
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <img src="@/assets/logo-poltekes.jpg" alt="" />
          </div>
          <div class="stepper">
            <div class="steps">
              <div>
                <div
                  class="circle"
                  :class="{ active: aktiv == 'step1' }"
                  @click="aktiv = 'step1'"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div class="v2" />
              </div>
              <div class="info">
                <h3 class="mb-1">Pilih Role Anda</h3>
                <p class="mt-0">memilih role akun anda</p>
              </div>
            </div>
          </div>
          <div class="stepper">
            <div class="steps">
              <div>
                <div
                  class="circle"
                  :class="{ active: aktiv == 'step2' }"
                  @click="aktiv = 'step2'"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div class="v2" />
              </div>

              <div class="info">
                <h3 class="mb-1">Form</h3>
                <p class="mt-0">Isi data diri Anda</p>
              </div>
            </div>
          </div>
          <div class="stepper">
            <div class="steps">
              <div>
                <div
                  class="circle"
                  :class="{ active: aktiv == 'step3' }"
                  @click="aktiv = 'step3'"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div class="v2" />
              </div>
              <div class="info">
                <h3 class="mb-1">User Agreement</h3>
                <p class="mt-0">Checklist syarat kebijakan</p>
              </div>
            </div>
          </div>
          <div class="stepper">
            <div class="steps">
              <div>
                <div
                  class="circle"
                  :class="{ active: aktiv == 'step4' }"
                  @click="aktiv = 'step4'"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <!-- <div class="v2" /> -->
              </div>
              <div class="info">
                <h3 class="mb-1">Update Password</h3>
                <p class="mt-0">Check email lakukan konfirmasi password</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 d-flex justify-content-center">
        <Step1 v-if="aktiv == 'step1'" @role="setRole($event)" />
        <Step2 v-if="aktiv == 'step2'" @form="setForm($event)" />
        <Step3 v-if="aktiv == 'step3'" @kebijakan="setKebijakan($event)" />
        <Step4 v-if="aktiv == 'step4'" />
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import qs from "qs";
import Step1 from "./Register1.vue";
import Step2 from "./Register2.vue";
import Step3 from "./Register3.vue";
import Step4 from "./Register4.vue";
export default {
  components: {
    Step1,
    Step2,
    Step3,
    Step4,
  },
  data() {
    return {
      aktiv: "step1",
    };
  },
  setup() {
    const data = reactive({
      username: "",
      role: "",
      identity: "",
      NIK: "",
      no_hp_users: "",
      nama_lengkap_users: "",
      syarat_kebijakan: "",
    });

    const busy = reactive(false);

    const rules = computed(() => {
      return {
        username: {
          required,
          email,
        },
        role: {
          required,
        },
        identity: {
          required,
          numeric,
        },
        NIK: {
          required,
          minLength: minLength(16),
        },
        no_hp_users: {
          required,
          numeric,
        },
        nama_lengkap_users: {
          required,
        },
        syarat_kebijakan: {
          required,
        },
      };
    });

    const v$ = useValidate(rules, data);

    return {
      v$,
      data,
      rules,
      busy,
    };
  },
  computed: {
    formString() {
      return JSON.stringify(this.data);
    },
    isValid() {
      return !this.v$.$invalid;
    },
    isDirty() {
      return this.v$.$anyDirty;
    },
  },
  methods: {
    setRole(x) {
      this.data.role = x.role;
      this.aktiv = x.step;
    },
    setForm(x) {
      let vm = this;
      vm.data.username = x.username;
      vm.data.NIK = x.NIK;
      vm.data.identity = x.identity;
      vm.data.no_hp_users = x.no_hp_users;
      vm.data.syarat_kebijakan = x.syarat_kebijakan;
      vm.data.nama_lengkap_users = x.nama_lengkap_users;
      vm.aktiv = x.step;
    },
    setKebijakan(x) {
      console.log(x);
      let vm = this;
      vm.data.syarat_kebijakan = x.syarat_kebijakan;
      vm.aktiv = x.step;
    },
    async register() {
      let vm = this;
      vm.busy = true;
      let register = await vm.$axios.post(
        "users/register",
        qs.stringify(vm.data),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(register);
      if (register.status == 200) {
        vm.busy = false;
        console.log(register.data.message);
        vm.reset();
        vm.$router.push({ path: "/login" });
      } else {
        vm.busy = false;
      }
    },
    reset() {
      this.data = {
        email: "",
        role: "",
        identity: "",
        nama_lengkap_user: "",
        no_hp_users: "",
        NIK: "",
        syarat_kebijakan: "",
      };
    },
    ifValid(fieldName, l) {
      const field = this.v$[fieldName];
      let x = this.rules[fieldName];

      let y;
      for (y in x) {
        if (field[y].$invalid) {
          if (y == "required") {
            return "* Data wajib diisi";
          } else if (y == "email") {
            return "* Data harus berbentuk email";
          } else if (y == "numeric") {
            return "* Data harus terdiri hanya dari angka";
          } else if (y == "minLength") {
            return `* Data minimal ${l} digits`;
          }
        }
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
.container {
  /* background-image: url("https://picsum.photos/seed/picsum/200/300"); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-color: #ffffff;
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
}
p {
  font-size: 11px;
}

.v2 {
  border-left: 3px solid #ffffff;
  height: 40px;
  margin: 10px 0 10px 1rem;
}

.card-body {
  padding: 5rem;
  max-height: 270px;
}

.stepper {
  /* margin-top: 40px; */
  display: flex;
  justify-content: flex-start;
  padding-left: 3rem;
}
.steps {
  display: flex;
  text-align: start;
}
.info {
  color: #e5e5e5;
}
.circle {
  border: solid 1px #ffffff;
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #027a48;
  margin-right: 10px;
}

.card {
  width: 90%;
  max-width: 640px;
  height: 100vh;
  margin-left: 0px;
  border: 1px solid transparent;
  background-color: #027a48;
}
</style>
