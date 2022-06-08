<template>
  <div class="container">
    <div class="row d-flex">
      <div class="col-md-4">
        <div class="card text-center">
          <div class="card-body">
            <img src="@/assets/logo-poltekes2.svg" alt="" />
          </div>
          <div class="stepper">
            <div class="steps">
              <div>
                <div
                  v-if="aktiv != 'step1' && state.role != ''"
                  class="circle"
                  @click="aktiv = 'step1'"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div
                  v-if="aktiv == 'step1'"
                  class="circle"
                  @click="aktiv = 'step1'"
                >
                  <i class="fa-solid fa-circle" />
                </div>

                <div
                  v-if="aktiv != 'step1' && state.role == ''"
                  class="circle2"
                  @click="aktiv = 'step1'"
                >
                  <i class="fa-solid fa-circle icog"></i>
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
                  v-if="
                    aktiv != 'step2' &&
                    state.identity != '' &&
                    state.nama_lengkap_users != '' &&
                    state.no_hp_users != '' &&
                    state.username != '' &&
                    state.NIK != ''
                  "
                  class="circle"
                  @click="gostep('step2')"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div
                  v-if="aktiv == 'step2'"
                  class="circle"
                  @click="gostep('step2')"
                >
                  <i class="fa-solid fa-circle" />
                </div>

                <div
                  v-if="
                    aktiv != 'step2' &&
                    state.identity == '' &&
                    state.nama_lengkap_users == '' &&
                    state.no_hp_users == '' &&
                    state.username == '' &&
                    state.NIK == ''
                  "
                  class="circle2"
                  @click="gostep('step2')"
                >
                  <i class="fa-solid fa-circle icog"></i>
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
                  v-if="aktiv != 'step3' && state.syarat_kebijakan != ''"
                  class="circle"
                  @click="gostep('step3')"
                >
                  <i class="fa-solid fa-check" />
                </div>
                <div
                  v-if="aktiv == 'step3'"
                  class="circle"
                  @click="gostep('step3')"
                >
                  <i class="fa-solid fa-circle" />
                </div>

                <div
                  v-if="aktiv != 'step3' && state.syarat_kebijakan == ''"
                  class="circle2"
                  @click="gostep('step3')"
                >
                  <i class="fa-solid fa-circle icog"></i>
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
                <!-- <div
                  v-if="aktiv != 'step4'"
                  class="circle"
                  @click="gostep('step4')"
                >
                  <i class="fa-solid fa-check" />
                </div> -->
                <div
                  v-if="aktiv == 'step4'"
                  class="circle"
                  @click="gostep('step4')"
                >
                  <i class="fa-solid fa-circle" />
                </div>

                <div
                  v-if="aktiv != 'step4'"
                  class="circle2"
                  @click="gostep('step4')"
                >
                  <i class="fa-solid fa-circle icog"></i>
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
        <Step2
          v-if="aktiv == 'step2'"
          :aktiv="aktiv"
          :state="state"
          @form="setForm($event)"
        />
        <Step3 v-if="aktiv == 'step3'" @kebijakan="setKebijakan($event)" />
        <Step4 v-if="aktiv == 'step4'" :state="state" />
      </div>
    </div>
  </div>
</template>

<script>
// import useValidate from "@vuelidate/core";
// import { required, email, minLength, numeric } from "@vuelidate/validators";
import { reactive } from "vue";
// import qs from "qs";
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
      valid: false,
      emails: false,
      alert: "",
      show: "",
    };
  },
  setup() {
    const state = reactive({
      username: "",
      role: "",
      identity: "",
      NIK: "",
      no_hp_users: "",
      nama_lengkap_users: "",
      syarat_kebijakan: "",
    });

    // const busy = reactive(false);

    // const rules = computed(() => {
    //   return {
    //     username: {
    //       required,
    //       email,
    //     },
    //     role: {
    //       required,
    //     },
    //     identity: {
    //       required,
    //       numeric,
    //     },
    //     NIK: {
    //       required,
    //       minLength: minLength(16),
    //     },
    //     no_hp_users: {
    //       required,
    //       numeric,
    //     },
    //     nama_lengkap_users: {
    //       required,
    //     },
    //     syarat_kebijakan: {
    //       required,
    //     },
    //   };
    // });

    // const v$ = useValidate(rules, data);

    return {
      // v$,
      state,
      // rules,
      // busy,
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
  methods: {
    setRole(x) {
      this.state.role = x.role;
      this.aktiv = "step2";
    },
    setForm(x) {
      let vm = this;
      vm.state.username = x.username;
      vm.state.NIK = x.NIK;
      vm.state.identity = x.identity;
      vm.state.no_hp_users = x.no_hp_users;
      vm.state.syarat_kebijakan = x.syarat_kebijakan;
      vm.state.nama_lengkap_users = x.nama_lengkap_users;
      vm.valid = true;
      vm.aktiv = "step3";
    },
    setKebijakan(x) {
      let vm = this;
      vm.state.syarat_kebijakan = x.syarat_kebijakan;
      this.register();
    },
    gostep(x) {
      let vm = this;
      if (x == "step2") {
        if (vm.state.role != "") {
          this.aktiv = "step2";
        }
      } else if (x == "step3") {
        if (vm.valid) {
          this.aktiv = "step3";
        }
      } else if (x == "step4") {
        if (vm.state.syarat_kebijakan != 0 && vm.emails) {
          this.aktiv = "step4";
        }
      }
    },
    async register() {
      let vm = this;
      vm.busy = true;
      console.log(vm.state);
      this.$store.dispatch("set_loading", true);
      let register = await vm.$axios.post("users/register", vm.state);
      console.log(register);
      if (register.data.status == 200) {
        if (register.data.message == "sukses") {
          vm.aktiv = "step4";
          vm.emails = true;
          vm.$store.dispatch("set_loading", false);
          vm.$store.dispatch("set_alert_show_success", register.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
        } else {
          // alert(register.data.message);
          vm.$store.dispatch("set_alert_show_fail", register.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
          vm.$store.dispatch("set_loading", false);
        }
      } else {
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_fail", register.data.message);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
        }, 2000);
        console.log("error");
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
  padding: 0;
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
.circle2 {
  border: solid 1px #ffffff;
  width: 36px;
  height: 36px;
  background-color: #027a48;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #027a48;
  margin-right: 10px;
}
.icog {
  color: #ffffff;
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
