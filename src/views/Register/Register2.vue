<template>
  <div class="container">
    <div class="row d-flex d-none d-sm-block">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="box">
          <div class="title">
            <div><h1>Formulir</h1></div>
          </div>
          <div>
            <h6>Isi data diri Anda sesuai dengan formulir yang ada</h6>
          </div>
          <div class="forms">
            <div class="input-box">
              <span class="details">NIM / NIP *</span>
              <input
                type="text"
                placeholder="Masukkan nomor identitas akademik"
                required
                v-model="data.identity"
              />
              <span class="text-danger fst-italic">{{
                ifValid("identity")
              }}</span>
            </div>
          </div>
          <div class="forms">
            <!-- <div class="input-box">
              <span class="details">Nama Lengkap</span>
              <input
                type="text"
                placeholder="Masukkan Nama lengkap"
                required
                v-model="data.nama_lengkap_users"
              />
              <span class="text-danger fst-italic">{{
                ifValid("nama_lengkap_users")
              }}</span>
            </div> -->
            <div class="input-box">
              <span class="details">Akun Official *</span>
              <div class="input-group2">
                <input
                  class="input2"
                  type="text"
                  placeholder="Masukkan email lengkap"
                  required
                  v-model="data.usernamex"
                  @input="ihir()"
                />
                <div class="prepend" v-if="state.role == 'mahasiswa'">
                  .mhs@poltekkes-smg.ac.id
                </div>
                <div class="prepend" v-if="state.role != 'mahasiswa'">
                  @poltekkes-smg.ac.id
                </div>
              </div>
              <span class="text-danger fst-italic">{{
                ifValid("usernamex", 4)
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">Email Pribadi *</span>
              <input
                type="text"
                placeholder="Masukkan email lengkap"
                required
                v-model="data.email_pribadi"
              />
              <span class="text-danger fst-italic">{{
                ifValid("email_pribadi")
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">No. Handphone</span>
              <input
                type="text"
                placeholder="Masukkan No. Handphone Aktif"
                required
                v-model="data.no_hp_users"
              />
              <span class="text-danger fst-italic">{{
                ifValid("no_hp_users")
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">NIK</span>
              <input
                type="text"
                placeholder="Masukkan NIK"
                required
                v-model="data.NIK"
              />
              <span class="text-danger fst-italic">{{
                ifValid("NIK", 16)
              }}</span>
            </div>

            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
                  <button
                    :disabled="!isValid"
                    class="btn btn-outline-success"
                    @click="lanjut()"
                  >
                    Simpan Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex d-xl-none d-lg-none d-md-none">
      <div class="col-md-12 d-flex justify-content-center">
        <div class="box2">
          <div class="title">
            <div><h1>Formulir</h1></div>
          </div>
          <div>
            <h6>Isi data diri Anda sesuai dengan formulir yang ada</h6>
          </div>
          <div class="forms">
            <div class="input-box">
              <span class="details">NIM / NIP *</span>
              <input
                type="text"
                placeholder="Masukkan nomor identitas akademik"
                required
                v-model="data.identity"
              />
              <span class="text-danger fst-italic">{{
                ifValid("identity")
              }}</span>
            </div>
          </div>
          <div class="forms">
            <!-- <div class="input-box">
              <span class="details">Nama Lengkap</span>
              <input
                type="text"
                placeholder="Masukkan Nama lengkap"
                required
                v-model="data.nama_lengkap_users"
              />
              <span class="text-danger fst-italic">{{
                ifValid("nama_lengkap_users")
              }}</span>
            </div> -->
            <div class="input-box">
              <span class="details">Akun Official *</span>
              <input
                type="text"
                placeholder="Masukkan email lengkap"
                required
                v-model="data.usernamex"
                @input="ihir()"
              />

              <div class="prepend" v-if="state.role == 'mahasiswa'">
                .mhs@poltekkes-smg.ac.id
              </div>
              <div class="prepend" v-if="state.role != 'mahasiswa'">
                @poltekkes-smg.ac.id
              </div>
              <span class="text-danger fst-italic">{{
                ifValid("usernamex", 4)
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">Email Pribadi *</span>
              <input
                type="text"
                placeholder="Masukkan email lengkap"
                required
                v-model="data.email_pribadi"
              />
              <span class="text-danger fst-italic">{{
                ifValid("email_pribadi")
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">No. Handphone</span>
              <input
                type="text"
                placeholder="Masukkan No. Handphone Aktif"
                required
                v-model="data.no_hp_users"
              />
              <span class="text-danger fst-italic">{{
                ifValid("no_hp_users")
              }}</span>
            </div>
            <div class="input-box">
              <span class="details">NIK</span>
              <input
                type="text"
                placeholder="Masukkan NIK"
                required
                v-model="data.NIK"
              />
              <span class="text-danger fst-italic">{{
                ifValid("NIK", 16)
              }}</span>
            </div>

            <div class="mb-3 mt-3">
              <div class="d-flex justify-content-center">
                <div class="col-12">
                  <button
                    :disabled="!isValid"
                    class="btn btn-outline-success"
                    @click="lanjut()"
                  >
                    Simpan Data
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
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  numeric,
  maxLength,
  alphaNum,
  helpers,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  props: ["aktiv", "state"],
  setup() {
    const data = reactive({
      usernamex: "",
      role: "",
      identity: "",
      NIK: "",
      no_hp_users: "",
      nama_lengkap_users: "",
      email_pribadi: "",
      step: "step3",
    });

    const official = helpers.regex(/^[a-zA-Z0-9.]*$/);

    const rules = computed(() => {
      return {
        usernamex: {
          required,
          official,
          minLength: minLength(4),
        },
        identity: {
          required,
          alphaNum,
          // numeric,
        },
        NIK: {
          required,
          minLength: minLength(16),
          maxLength: maxLength(16),
        },
        no_hp_users: {
          required,
          numeric,
        },
        email_pribadi: {
          required,
          email,
        },
      };
    });

    const v$ = useValidate(rules, data);

    return {
      v$,
      data,
      rules,
    };
  },
  mounted() {
    this.check();
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
    async lanjut() {
      this.$emit("form", this.data);
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
          } else if (y == "maxLength") {
            return `* Data maksimal ${l} digits`;
          } else if (y == "alphaNum") {
            return `* Data tidak boleh mengandung spasi atau simbol`;
          } else if (y == "official") {
            return `* Data tidak boleh mengandung spasi atau simbol`;
          }
        }
      }
    },
    check() {
      let y;
      for (y in this.data) {
        if (this.data[y] == "") {
          this.data[y] = this.state[y];
        }
      }
    },
    ihir() {
      // console.log(this.data.usernamex);
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
  background-color: #e5e5e5;
  min-height: 100vh;
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
.box {
  padding: 100px;
  width: 80%;
}
.box2 {
  padding: 20px;
  width: 100%;
}

.details {
  margin-bottom: 5px;
}

.card {
  width: 90%;
  max-width: 640px;
  height: 100vh;

  /* border-radius: 1rem; */
  border: 1px solid transparent;
  background-color: #027a48;
}

input {
  height: 45px;
  border-radius: 5px;
}
.input2 {
  height: 45px;
  border-radius: 5px;
  width: 70%;
}

.input-group2 {
  height: 45px;
  border-radius: 5px;
  display: flex;
  margin-right: 0px;
  padding-right: 0px;
}

.forms {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.input-box {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 15px;
}
.btn {
  width: 100%;
  background-color: #027a48;
  color: #ffffff;
}

.btn:disabled {
  width: 100%;
  background-color: #027a48;
  color: black;
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

.lupa:hover {
  transform: scale(1.1);
  font-size: 16px;
  font-weight: 500;
  color: blue;
}

.box .title {
  font-size: 25px;
  font-weight: 500;
  position: relative;
}

.box .title::before {
  content: "";
  position: absolute;
  height: 3px;
  widows: 30px;
  left: 0;
  bottom: 0;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.box form .user-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
}

form .user-details .input-box {
  width: calc(100% / 2 - 20px);
  margin: 20px 0 12px 0;
}
.user-details .input-box .details {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}

.prepend {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.prepend2 {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 100%;
}
</style>
