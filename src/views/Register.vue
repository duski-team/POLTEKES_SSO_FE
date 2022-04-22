<template>
  <div class="container-fluid">
    <section class="box">
      <div class="title">Formulir Registrasi</div>
      <form action="#">
        <div class="role-details">
          <div class="category">
            <div>
              <span class="title">Role</span>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input dot"
                type="radio"
                id="inlineCheckbox1"
                value="Mahasiswa"
                name="role"
                v-model="data.role"
              />
              <label class="form-check-label label" for="inlineCheckbox1"
                >Mahasiswa/i</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input dot"
                type="radio"
                id="inlineCheckbox2"
                value="Dosen"
                name="role"
                v-model="data.role"
              />
              <label class="form-check-label" for="inlineCheckbox2"
                >Dosen</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input dot"
                type="radio"
                id="inlineCheckbox3"
                value="Tenaga Pendidik"
                name="role"
                v-model="data.role"
              />
              <label class="form-check-label" for="inlineCheckbox3"
                >Tendik</label
              >
            </div>
          </div>
        </div>
        <div class="user-details">
          <div class="input-box">
            <span class="details" v-if="data.role == 'Mahasiswa'">NIM</span>
            <span class="details" v-if="data.role == 'Dosen'">NIDN</span>
            <span class="details" v-if="data.role == 'Tenaga Pendidik'"
              >NIP</span
            >
            <span class="details" v-if="data.role == ''">NIM/NIDN/NIP</span>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              required
              v-model="data.identity"
            />
            <span class="text-danger fst-italic">{{ifValid('identity')}}</span>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input
              type="text"
              placeholder="Masukkan email lengkap"
              required
              v-model="data.username"
            />
            <span class="text-danger fst-italic">{{ifValid('username')}}</span>
          </div>
          <div class="input-box">
            <span class="details">NIK</span>
            <input
              type="text"
              placeholder="Masukkan NIK"
              required
              v-model="data.NIK"
            />
            <span class="text-danger fst-italic">{{ifValid('NIK',16)}}</span>
          </div>
          <div class="input-box">
            <span class="details">No. Handphone</span>
            <input
              type="text"
              placeholder="Masukkan No. Handphone Aktif"
              required
              v-model="data.no_hp_users"
            />
            <span class="text-danger fst-italic">{{ifValid('no_hp_users')}}</span>
          </div>
          <div class="input-box">
            <span class="details">Nama Lengkap</span>
            <input
              type="text"
              placeholder="Masukkan Nama lengkap"
              required
              v-model="data.nama_lengkap_users"
            />
            <span class="text-danger fst-italic">{{ifValid('nama')}}</span>
          </div>
        </div>
        <!-- <div>{{isValid}}</div> -->
        <div class="button text-center btn-primary" @click="register()" v-if="!busy" disabled>
          <div class="title">Daftar</div>
        </div>
        <div class="button text-center" @click="register()" v-else>
          <div class="title">Mohon Tunggu ...</div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, email, minLength, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import qs from "qs"
export default {
  setup() {
    const data = reactive({
      username: "",
      role: "",
      identity: "",
      NIK: "",
      no_hp_users: "",
      nama_lengkap_users:""
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
    async register() {
      let vm = this;
      vm.busy = true;
      let register = await vm.$axios.post("users/register", qs.stringify(vm.data),{
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        }});
      console.log(register);
      if (register.data.status == 200) {
        vm.busy = false;
        if (register.data.message == "sukses") {
          vm.reset();
          vm.$router.push({ path: "/login" });
        }
      } else {
        vm.busy = false;
      }
    },
    reset() {
      this.data = {
        username: "",
        role: "",
        password: "",
        password2: "",
        NIP: "",
      };
    },
    ifValid(fieldName,l) {
      const field = this.v$[fieldName]
      let x = this.rules[fieldName]
      
      let y 
      for (y in x){
        if(field[y].$invalid){
          if(y == 'required'){
            return "* Data wajib diisi"
          }else if(y == 'email'){
            return "* Data harus berbentuk email"
          } else if (y == 'numeric'){
            return "* Data harus terdiri hanya dari angka"
          } else if( y == 'minLength'){
            return `* Data minimal ${l} digits`
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
.container-fluid {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  text-align: start;
}
.box {
  max-width: 700px;
  width: 100%;
  background: #fff;
  padding: 25px 30px;
  border-radius: 5px;
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
.user-details .input-box input {
  height: 45px;
  width: 100%;
  outline: none;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding-left: 15px;
  font-size: 16px;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
}

.user-details .input-box input:focus,
.user-details .input-box input:valid {
  border-color: #9b59b6;
}

form .role-details .role-title {
  font-size: 20px;
  font-weight: 500;
}

form .role-details .category {
  display: flex;
  width: 80%;
  margin: 14px 0;
  justify-content: space-between;
}

.role-details .category label {
  display: flex;
  align-items: center;
}
.role-details .category .title {
  font-size: 18px;
}

.role-details .category .dot {
  height: 18px;
  width: 18px;
  background: #d9d9d9;
  border-radius: 50%;
  margin-right: 10px;
  border: 5px solid transparent;
  transition: all 0.3s ease;
}
.role-details .category .dot:checked {
  border-color: #d9d9d9;
  background: #9b59b6;
}

form .button {
  height: 100%;
  margin: 45px 0;
  width: 100%;
  color: #fff;
  /* background: linear-gradient(135deg, #71b7e6, #9b59b6); */
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-radius: 5px;
}

.button .title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
}

form .button:hover {
  height: 100%;
  margin: 45px 0;
  width: 100%;
  color: #fff;
  /* background: linear-gradient(-135deg, #71b7e6, #9b59b6); */
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border-radius: 5px;
}

@media (max-width: 584px) {
  .box {
    max-width: 100%;
  }

  form .user-details .input-box {
    width: 100%;
    margin-bottom: 15px;
  }
  form .role-details .category {
    width: 100%;
  }
  .box form .user-details {
    max-height: 600px;
    overflow-y: scroll;
  }
  .user-details::-webkit-scrollbar {
    width: 0;
  }
}
</style>
