<template>
  <div>
    <div><Header /></div>
    <div class="container">
      <div
        v-if="$store.state.biodata"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <p>
          <strong>Welcome!</strong>
          {{ $store.state.biodata.nama_lengkap_users }}
        </p>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div class="d-none d-sm-block">
        <section v-if="$store.state.biodata" class="glass">
          <div class="dashboard">
            <div class="user">
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
              <div class="nama">
                <p>{{ $store.state.biodata.nama_lengkap_users }}</p>
              </div>
              <div class="role">
                <div v-if="$store.state.biodata.role == 'pegawai'">
                  <p class="mr-1">TENDIK</p>
                </div>
                <div v-else>
                  <p class="mr-1">
                    {{ $store.state.biodata.role.toUpperCase() }}
                  </p>
                </div>
                <div><p>|</p></div>
                <div>
                  <p class="ml-1" style="color: #027a48">
                    <strong>{{ $store.state.biodata.identity }}</strong>
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
            <div
              class="jurusan-wrapper mt-3"
              v-if="$store.state.biodata.role == 'mahasiswa'"
            >
              <h5 style="line-height: 14px">
                {{ $store.state.profil.f_jenjang }}
              </h5>
              <p style="line-height: 14px; font-size: 14px">
                {{ $store.state.profil.f_namaprogdi_baru }}
              </p>
            </div>
            <div
              class="jurusan-wrapper mt-3"
              v-if="
                $store.state.biodata.role == 'dosen' ||
                $store.state.biodata.role == 'pegawai'
              "
            >
              <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
              <p style="line-height: 14px; font-size: 14px">
                {{ $store.state.profil.skpd }}
              </p>
            </div>
            <div
              class="jurusan-wrapper mt-3"
              v-if="$store.state.biodata.role == 'admin'"
            >
              <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
              <p style="line-height: 14px; font-size: 14px">Admin</p>
            </div>
          </div>
          <!-- <div class="tools text-start">
            <div class="box-info">
              <div class="box-title mb-3" style="color: #027a48">Resource</div>
              <div class="box-content" @click="$router.push('/payment')">
                <div>
                  <img class="icons" src="@/assets/Icon1.jpg" alt="" />
                </div>
                <div>
                  <h6>Tagihan</h6>
                  <p>Pembayaran Tagihan Biaya Pendidikan Tahun 2022</p>
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
                  <img
                    class="icons2"
                    src="http://placekitten.com/700/500"
                    alt=""
                  />
                </div>
                <div>
                  <h6>Lorem</h6>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                </div>
              </div>
              <div class="box-content2">
                <div>
                  <img
                    class="icons2"
                    src="http://placekitten.com/700/500"
                    alt=""
                  />
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
          </div> -->
          <div
            class="toolsdemo text-start"
            v-if="$store.state.payment.status_tagihan == 1"
          >
            <div class="box-info">
              <div class="row">
                <div class="col">
                  <!-- <div class="d-flex justify-content-between" style="width: 80%">
                    <button class="button-payment">Lihat Panduan SSO</button>

                    <button class="button-payment">
                      Lihat Pedoman Akademik
                    </button>
                  </div> -->
                  <div class="text-tagihan">
                    Status anda adalah Mahasiswa Aktif Poltekkes Kemenkes Jawa
                    Tengah.
                  </div>
                  <div class="text-tagihan">
                    Pada Semester Ganjil Tahun Akademik 2022
                  </div>

                  <div class="text-tagihan">
                    <span style="color:grey">Email Official</span> anda akan aktif dalam 2 x 24 jam setelah status anda aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="toolsdemo text-start"
            v-if="$store.state.payment.status_tagihan == 0"
          >
            <div class="box-info">
              <div class="row">
                <div class="col">
                  <div class="text-tagihan">
                    Halo, {{ $store.state.biodata.nama_lengkap_users }} (
                    {{ $store.state.biodata.identity }} )
                  </div>
                  <div class="text-tagihan">
                    Anda memiliki tagihan biaya pendidikan sebesar :
                  </div>
                  <div class="text-tagihan">
                    Rp. {{ convert($store.state.payment.totalTagihan) }}
                    <span style="color: grey">pada semester Ganjil 2022</span>
                  </div>
                  <div>
                    <button
                      class="button-payment"
                      @click="$router.push('/payment')"
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                  <div class="text-invoice">
                    NO. INVOICE : {{ $store.state.payment.trx_id }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="d-xl-none d-lg-none d-md-none">
        <section v-if="$store.state.biodata">
          <div class="row glass-hp">
            <div class="col">
              <div class="dashboard-hp">
                <div class="user">
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
                  <div class="nama">
                    <p>{{ $store.state.biodata.nama_lengkap_users }}</p>
                  </div>
                  <div class="role">
                    <div v-if="$store.state.biodata.role == 'pegawai'">
                      <p class="mr-1">TENDIK</p>
                    </div>
                    <div v-else>
                      <p class="mr-1">
                        {{ $store.state.biodata.role.toUpperCase() }}
                      </p>
                    </div>
                    <div><p>|</p></div>
                    <div>
                      <p class="ml-1" style="color: #027a48">
                        <strong>{{ $store.state.biodata.identity }}</strong>
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
                <div
                  class="jurusan-wrapper mt-3 text-center"
                  v-if="$store.state.biodata.role == 'mahasiswa'"
                >
                  <h5 style="line-height: 14px">
                    {{ $store.state.profil.f_jenjang }}
                  </h5>
                  <p style="line-height: 14px; font-size: 14px">
                    {{ $store.state.profil.f_namaprogdi_baru }}
                  </p>
                </div>
                <div
                  class="jurusan-wrapper mt-3 text-center"
                  v-if="
                    $store.state.biodata.role == 'dosen' ||
                    $store.state.biodata.role == 'pegawai'
                  "
                >
                  <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
                  <p style="line-height: 14px; font-size: 14px">
                    {{ $store.state.profil.skpd }}
                  </p>
                </div>
                <div
                  class="jurusan-wrapper mt-3 text-center"
                  v-if="$store.state.biodata.role == 'admin'"
                >
                  <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
                  <p style="line-height: 14px; font-size: 14px">Admin</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row glass-hp">
            <div class="col">
              <div class="tools-hp text-start">
                <div class="box-info-hp">
                  <div class="box-title mb-3" style="color: #027a48">
                    Resource
                  </div>
                  <div class="box-content-hp" @click="$router.push('/payment')">
                    <div>
                      <img class="icons" src="@/assets/Icon1.jpg" alt="" />
                    </div>
                    <div>
                      <h6>Tagihan</h6>
                      <p>Pembayaran Tagihan Biaya Pendidikan Tahun 2022</p>
                    </div>
                  </div>

                  <div class="box-content-hp">
                    <div>
                      <img class="icons" src="@/assets/Icon2.jpg" alt="" />
                    </div>
                    <div>
                      <h6>Lorem</h6>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                      </p>
                    </div>
                  </div>
                  <div class="box-content-hp">
                    <div>
                      <img class="icons" src="@/assets/Icon3.jpg" alt="" />
                    </div>
                    <div>
                      <h6>Lorem</h6>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row glass-hp">
            <div class="col">
              <div class="tools-hp">
                <div class="box-info-hp">
                  <div class="box-title mb-3" style="color: #027a48">
                    Informasi Baru
                  </div>
                  <div class="box-content2-hp">
                    <div>
                      <img
                        class="icons2-hp"
                        src="http://placekitten.com/700/500"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6>Lorem</h6>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                      </p>
                    </div>
                  </div>
                  <div class="box-content2-hp">
                    <div>
                      <img
                        class="icons2-hp"
                        src="http://placekitten.com/700/500"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6>Lorem</h6>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                      </p>
                    </div>
                  </div>
                  <div class="box-title mb-3" style="color: #027a48">
                    Baca Informasi ->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- <section class="fas-wrapper">
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
    </section> -->
      <section class="fas-wrapper">
        <div class="app-title d-flex">
          <p>Aplikasi & Layanan</p>
          /
          <p>applications & services</p>
        </div>
        <div class="row">
          <div
            v-for="item in $store.state.app"
            :key="item.id"
            class="box-app col-md-3 col-sm-4 mb-3"
            @click="goApp(item)"
          >
            <div class="cards">
              <div v-if="item.logo_client">
                <img class="icons" :src="item.src1" alt="" />
              </div>
              <div v-else>
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
    <div class="footer">
      <Footer />
    </div>
    <div class="popup"><Popup /></div>
  </div>
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
      backup: false,
    };
  },
  mounted() {
    if (!this.$store.state.biodata || !this.$store.state.app) {
      this.getData();
    }
    this.getTagihan();
  },
  methods: {
    async getData() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      try {
        let biodata = await vm.$axios.get(
          "users/detailsById/" + vm.$store.state.sso_user_id
        );
        // vm.biodata = biodata.data.data[0];
        vm.$store.dispatch("set_biodata", biodata.data.data[0]);
        if (biodata.data.profil[0]) {
          vm.$store.dispatch("set_profil", biodata.data.profil[0]);
        } else {
          vm.$store.dispatch("set_profil", {});
        }

        let app = await vm.$axios.get("client/list");

        vm.$store.dispatch("set_app", app.data.data);

        let tagihan = await vm.$axiosbilling.post(
        "detailsTagihanStudi/listDetailsTagihanStudiByNIM",
        {
          nim: vm.$store.state.biodata.identity,
        }
      );
      console.log(tagihan, "tagihan");
      vm.$store.dispatch("payment", tagihan.data.data[0]);
        // vm.app = app.data.data;
        // console.log(this.$store.state.profil);
        vm.$store.dispatch("set_loading", false);
      } catch (error) {
        vm.$store.dispatch("set_loading", false);
        console.log(error.response);
      }
    },
    async getTagihan() {
      let vm = this;
      let tagihan = await vm.$axiosbilling.post(
        "detailsTagihanStudi/listDetailsTagihanStudiByNIM",
        {
          nim: vm.$store.state.biodata.identity,
        }
      );
      console.log(tagihan, "tagihan");
      vm.$store.dispatch("payment", tagihan.data.data[0]);
    },
    goApp(x) {
      window.open(
        x.redirect_uri + "?token=" + this.$store.state.sso_access_token
      );
    },
    convert(x) {
      if (x) {
        return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
  /* color: aqua; */
}

.alert-success {
  text-align: center;
  padding-bottom: 0px;
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

.glass-hp {
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
.dashboard-hp {
  width: 100%;
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
  width: 100px;
  height: 100px;
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
  text-align: center;
}

.tools {
  display: flex;
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

.toolsdemo {
  display: flex;
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
  border: 5px solid #027a48;
  box-sizing: border-box;
  /* Shadow/sm */
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}

.tools-hp {
  display: flex;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  width: 100%;
  /* background-color: #027a48; */
  padding: 2rem;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;
}

.box-info-hp {
  width: 100%;
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

.box-content-hp {
  display: flex;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
  width: 100%;
}

.box-content2 {
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.box-content2-hp {
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  /* background-color: #027a48; */
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

.icons2-hp {
  margin-right: 5px;
  width: 100px;
  height: 100px;
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

.box-app {
  cursor: pointer;
}

.text-tagihan {
  color: #027a48;
  font-size: 18px;
  font-weight: 900;
  margin: 3mm 3mm 3mm 3mm;
  letter-spacing: 1px;
}

.text-invoice {
  color: black;
  font-size: 18px;
  font-weight: 900;
  margin: 3mm 3mm 3mm 3mm;
  letter-spacing: 1px;
}

.button-payment {
  margin: 3mm 3mm 3mm 3mm;
  background-color: orange;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 10px;
  color: #eaecf0;
  font-size: 24px;
}
</style>
