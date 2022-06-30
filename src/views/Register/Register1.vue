<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="cb1 m-2 text-center">
          <img src="@/assets/logo-poltekes.jpg" alt="" />
          <h5 class="SSO mb-4">Pilih Role Anda</h5>
          <h5 class="card-title mb-4">pilih role user anda</h5>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4 d-flex justify-content-center">
        <div
          class="card2"
          v-if="data.role != 'mahasiswa'"
          @click="data.role = 'mahasiswa'"
        >
          <img src="@/assets/mahasiswa.jpg" alt="" />
          <!-- <i class="fa-regular fa-face-grin-wide fa-10x"></i> -->
          <div>
            <center><p class="SSO">Mahasiswa</p></center>
          </div>
        </div>
        <div
          class="card"
          v-if="data.role == 'mahasiswa'"
          @click="data.role = ''"
        >
          <img src="@/assets/mahasiswa.jpg" alt="" />
          <!-- <i class="fa-regular fa-face-grin-wide fa-10x"></i> -->
          <div>
            <center><p class="SSO">Mahasiswa</p></center>
          </div>
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-center">
        <div
          class="card2"
          v-if="data.role != 'dosen'"
          @click="data.role = 'dosen'"
        >
          <!-- <i class="fa-regular fa-face-meh fa-10x"></i> -->
          <img src="@/assets/dosen.jpg" alt="" />
          <div>
            <center><p class="SSO">Dosen</p></center>
          </div>
        </div>
        <div class="card" v-if="data.role == 'dosen'" @click="data.role = ''">
          <img src="@/assets/dosen.jpg" alt="" />
          <!-- <i class="fa-regular fa-face-meh fa-10x"></i> -->
          <div>
            <center><p class="SSO">Dosen</p></center>
            
          </div>
        </div>
      </div>
      <div class="col-md-4 d-flex justify-content-center">
        <div
          class="card2"
          v-if="data.role != 'pegawai'"
          @click="data.role = 'pegawai'"
        >
          <img src="@/assets/tenagaPendidik.jpg" alt="" />
          <!-- <i class="fa-regular fa-face-flushed fa-10x"></i> -->
          <div>
            <center><p class="SSO">Tenaga Pendidik</p></center>
          </div>
        </div>
        <div class="card" v-if="data.role == 'pegawai'" @click="data.role = ''">
          <img src="@/assets/tenagaPendidik.jpg" alt="" />
          <!-- <i class="fa-regular fa-face-flushed fa-10x"></i> -->
          <div>
            <center><p class="SSO">Tenaga Pendidik</p></center>
            
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="mb-3 mt-3">
          <div class="">
            <div class="col-12 d-flex justify-content-center">
              <button
                :disabled="data.role == ''"
                class="btn btn-outline-success"
                @click="pilih_role()"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from "qs";

export default {
  name: "Home",
  data() {
    return {
      data: {
        role: "",
        step: "step2",
      },
    };
  },
  methods: {
    show() {
      console.log(this.data.role);
    },
    pilih_role() {
      this.$emit("role", this.data);
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

.card {
  background-color: #ffffff;
  height: 324px;
  width: 280px;
  border-radius: 12px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  border-radius: 12px;
}

.card2 {
  background-color: #ffffff;
  height: 324px;
  width: 280px;
  border-radius: 12px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  border-radius: 12px;
}
.btn {
  margin-top: 20px;
  width: 324px;
  background-color: #027a48;
  color: #ffffff;
}

/* .btn:disabled {
  margin-top: 20px;
  width: 324px;
  background-color: black;
  color: #ffffff;
} */
</style>
