<template>
  <div><Header /></div>

  <div class="container">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Welcome!</strong> {{ biodata.nama_lengkap_users }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <section v-if="biodata" class="glass">
      <div class="dashboard">
        <div class="user">
          <div>
            <img class="foto mb-3" src="https://picsum.photos/100/100" alt="" />
          </div>
          <div class="nama">
            <p>{{ biodata.nama_lengkap_users }}</p>
          </div>
          <div class="role">
            <div>
              <p class="mr-1">{{ biodata.role.toUpperCase() }}</p>
            </div>
            <div><p>|</p></div>
            <div>
              <p class="ml-1" style="color: #027a48">
                <strong>{{ biodata.identity }}</strong>
              </p>
            </div>
          </div>
          <div class="btn-wrapper mb-2">
            <div
              type="button"
              class="btn btn-lihat"
              @click="$router.push({ path: '/profil' })"
            >
              Lihat Selengkapnya
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="jurusan-wrapper mt-3">
          <h5 style="line-height: 14px">Jurusan</h5>
          <p style="line-height: 14px; font-size: 14px">Prodi Jurusan</p>
        </div>
      </div>
      <div class="tools text-start">
        <div class="box-info">
          <div class="box-title mb-3" style="color: #027a48">Resource</div>
          <div class="box-content">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>

          <div class="box-content">
            <div>
              <img class="icons" src="@/assets/Icon2.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
          <div class="box-content">
            <div>
              <img class="icons" src="@/assets/Icon3.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
        <div class="box-info">
          <div class="box-title mb-3" style="color: #027a48">
            Informasi Baru
          </div>
          <div class="box-content2">
            <div>
              <img class="icons2" src="https://picsum.photos/100/100" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
          <div class="box-content2">
            <div>
              <img class="icons2" src="https://picsum.photos/100/101" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
          <div class="box-title mb-3" style="color: #027a48">
            Baca Informasi ->
          </div>
        </div>
      </div>
    </section>
    <section class="fas-wrapper">
      <div class="app-title d-flex">
        <p>Fasilitas</p>
        /
        <p>facilities</p>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 mb-3">
          <div class="cards">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 mb-3">
          <div class="cards">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 mb-3">
          <div class="cards">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-4 mb-3">
          <div class="cards">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>Lorem</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="fas-wrapper">
      <div class="app-title d-flex">
        <p>Aplikasi & Layanan</p>
        /
        <p>applications & services</p>
      </div>
      <div class="row">
        <div
          v-for="item in app"
          :key="item.id"
          class="col-md-3 col-sm-4 mb-3"
          @click="goApp(item)"
        >
          <div class="cards">
            <div>
              <img class="icons" src="@/assets/Icon1.jpg" alt="" />
            </div>
            <div>
              <h6>{{ item.nama_client }}</h6>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div>
    <Footer />
  </div>
  <Popup />
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import Popup from "@/components/popup.vue";
export default {
  components: {
    Header,
    Footer,
    Popup,
  },
  data() {
    return {
      biodata: "",
      app: "",
      popup: "",
    };
  },
  created() {
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

        let app = await vm.$axios.get("client/list");
        // console.log(biodata.data);
        vm.app = app.data.data;
        vm.$store.dispatch("set_loading", false);
      } catch (error) {
        vm.$store.dispatch("set_loading", false);
        console.log(error.response);
      }
    },
    // async getpopup() {
    //   let vm = this;
    // },
    goApp(x) {
      window.open(
        x.redirect_uri + "?token=" + localStorage.getItem("SSO_access_token")
      );
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
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
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
  background-color: #ffffff;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  /* Shadow/sm */

  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
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
}

.role {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
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
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  /* Shadow/sm */
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}
.box-info {
  width: 80%;
  /* background-color: #027a48; */
  padding: 2rem;
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
</style>
