<template>
  <div><Header /></div>

  <div class="container">
    <div class="alert alert-secondary alert-dismissible fade show" role="alert">
      <strong>Perhatian</strong> Data nomor telepon ini tidak digunakan sebagai
      nomor telepon penerima kode OTP dari microsoft. Jika ingin merubah nomor
      telepon penerima kode OTP login silahkan kunjungi
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div v-if="biodata" class="glass">
      <div class="dashboard">
        <div class="user">
          <div class="edit mb-4">Edit - Account Profile</div>
         <div>
            <img
              v-if="!backup"
              class="foto mb-3"
              :src="$store.state.biodata.foto"
              alt="user photo profil"
              @error="backup = true"
            />
            <img
              v-else
              class="foto mb-3"
              src="@/assets/noprofil.png"
              alt="user photo profil"
            />
          </div>
        </div>
        <div
          class="jurusan-wrapper mt-3"
          v-if="$store.state.biodata.role == 'mahasiswa'"
        >
          <h5 style="line-height: 14px">Jurusan</h5>
          <p style="line-height: 14px; font-size: 14px">Prodi Jurusan</p>
        </div>
        <div class="jurusan-wrapper mt-3" v-else>
          <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
          <p style="line-height: 14px; font-size: 14px">
            {{ $store.state.profil.skpd }}
          </p>
        </div>
        <!-- <div class="line mt-1 mb-1"></div> -->
        <div class="role mt-3">
          <button @click="$router.push({ path: '/dashboard' })" class="btn-red">
            <p>Kembali</p>
          </button>
          <div>
            <button class="btn-green" @click="update()">
              <p>Simpan</p>
            </button>
          </div>
        </div>
      </div>
      <div class="tools text-start">
        <div class="box-info">
          <div class="input-box">
            <span class="details d-flex"
              ><p class="input-label text-strong">Nama</p>
              <p class="text-muted fst-italic">* tidak dapat diubah</p></span
            >
            <input
              type="text"
              disabled
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.nama_lengkap_users"
            />
          </div>
          <div class="input-box">
            <span class="details d-flex"
              ><p class="input-label text-strong">Email Official</p>
              <p class="text-muted fst-italic">* tidak dapat diubah</p></span
            >
            <input
              type="text"
              disabled
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.username"
            />
          </div>
          <div class="input-box">
            <span class="details"><p>Mobile Phone</p></span>
            <input
              type="text"
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.no_hp_users"
            />
          </div>
        </div>

        <div class="box-info">
          <div class="input-box">
            <span class="details d-flex"
              ><p class="input-label text-strong">Identitas</p>
              <p class="text-muted fst-italic">* tidak dapat diubah</p></span
            >
            <input
              type="text"
              disabled
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.identity"
            />
          </div>
          <div class="input-box">
            <span class="details d-flex"
              ><p class="input-label text-strong">NIK</p>
              <p class="text-muted fst-italic">* tidak dapat diubah</p></span
            >
            <input
              type="text"
              disabled
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.NIK"
            />
          </div>
          <div class="input-box">
            <span class="details"> <p>Email Pribadi</p></span>
            <input
              type="text"
              placeholder="Masukkan email lengkap"
              required
              v-model="biodata.username"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      biodata: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      try {
        let biodata = await vm.$axios.get(
          "users/detailsById/" + vm.$store.state.sso_user_id
        );
        vm.biodata = biodata.data.data[0];
        vm.$store.dispatch("set_loading", false);
      } catch (error) {
        console.log(error.response);
        vm.$store.dispatch("set_loading", false);
      }
    },
    async update() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      let update = await vm.$axios.post("users/update", vm.biodata);
      if (update.data.status == 200) {
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_success", update.data.message);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
        }, 4000);
      } else {
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_fail", update.data.message);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
        }, 4000);
      }
      console.log(update);
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
  height: 100vh;
  /* color: aqua; */
}

.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 4rem;
  text-align: center;
}

.glass {
  width: 100%;
  padding: 2rem 0.5rem 2rem 2rem;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 15px;
}

.fas-wrapper {
  width: 100%;
  padding: 1rem 0.5rem;
}

/* .glass:hover {
  width: 100%;
  padding: 1rem 0.5rem;

  border-radius: 1rem; */
/* border: 1px solid transparent;
  color: black; */
/* background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  ); */

/* backdrop-filter: blur(1rem); */
/* box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.2); */
/* 
  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
/* } */

.dashboard {
  width: 280px;
  height: 349px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  background-color: transparent;
  /* border: 1px solid #eaecf0; */
  box-sizing: border-box;
  /* Shadow/sm */

  /* box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px; */
}

.edit {
  font-size: 20px;
  font-weight: 700;
}

.user {
  /* margin: 3rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  /* background-color: #027a48; */
}

.nama {
  display: flex;
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}

.foto {
  border-radius: 30px;
  height: 100px;
  width: 100px;
}

.role {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  width: 100%;
}

.btn-wrapper {
  width: 100%;
  /* background-color: black; */
}

.btn-lihat {
  background-color: #027a48;
  color: #ffffff;
  height: 30px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 200;
  padding: 4px;
  width: 100%;
  border-radius: 11px;
}
.line {
  width: 100%;
  border: 2px solid transparent;
  background-color: rgba(225, 225, 225, 0.5);

  backdrop-filter: blur(1rem);
  /* box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5); */

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

.jurusan-wrapper {
  color: #667085;
  display: flex;
  flex-direction: column;
}

.tools {
  width: 906px;
  height: 349px;
  display: flex;
  gap: 24px;
  width: 956px;
  height: 349px;
  left: 422px;
  top: 163px;
  /* White */
  background: #ffffff;
  /* Gray/200 */
  /* border: 1px solid #eaecf0; */
  box-sizing: border-box;
  /* Shadow/sm */
  /* box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px; */
}
.box-info {
  width: 80%;
  /* background-color: #027a48; */
  padding: 1.5rem;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
}

.box-title {
  cursor: pointer;
}

.box-content {
  display: flex;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
}

.box-content2 {
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.icons {
  width: 25px;
  height: 25px;
  margin-right: 15px;
}

.icons2 {
  margin-right: 15px;
  width: 144px;
  height: 90px;
  border-radius: 15px;
}
h6 {
  font-weight: 700;
}

.biodata {
  display: flex;
  margin: 0.5rem 0rem;
  padding: 0.5rem 3rem;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */
}

.cards {
  display: flex;
  padding: 20px;
  text-align: start;
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid transparent;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.3)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.2);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

.biodata h2 {
  padding: 0rem 2rem;
}

/* .options {
} */

.card {
  display: flex;
  border-radius: 1rem;
  border: 1px solid transparent;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.3)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.1);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

img {
  cursor: pointer;
}

input {
  height: 45px;
  border-radius: 5px;
  letter-spacing: 1px;
  padding-left: 1rem;
  border-color: solid 1px #d0d5dd;
  color: black;
}

input:disabled {
  background-color: #d0d5dd;
  color: black;
  border-color: solid 1px #d0d5dd;
}

.input-label {
  font-weight: 700;
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
.btn-green {
  width: 130px;
  padding-top: 10px;
  background-color: #027a48;
  color: #ffffff;
  border: transparent;
  border-radius: 10px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-red {
  width: 130px;
  padding-top: 10px;
  background-color: #d92d20;
  color: #ffffff;
  border: transparent;
  border-radius: 10px;
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
