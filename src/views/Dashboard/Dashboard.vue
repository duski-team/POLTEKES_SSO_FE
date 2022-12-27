<template>
  <div>
    <div v-if="biodata"><Header /></div>
    <div class="container">
      <div
        v-if="biodata"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <p>
          <strong>Welcome!</strong>
          {{ biodata.nama_lengkap_users }}
        </p>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div class="d-none d-sm-block">
        <section v-if="biodata" class="glass">
          <div class="dashboard">
            <div class="user">
              <div>
                <img
                  v-if="!backup"
                  class="foto mb-3"
                  :src="biodata.foto"
                  alt="user photo profil"
                  @error="set_no_profil(biodata.foto)"
                />
                <img
                  v-else
                  class="foto mb-3"
                  src="@/assets/noprofil.png"
                  alt="user photo profil"
                />
              </div>
              <div class="nama text-center">
                <p>{{ biodata.nama_lengkap_users }}</p>
              </div>
              <div class="role">
                <div v-if="biodata.role == 'pegawai'">
                  <p class="mr-1">TENDIK</p>
                </div>
                <div v-else>
                  <p class="mr-1">
                    {{ biodata.role.toUpperCase() }}
                  </p>
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
            <div
              class="jurusan-wrapper mt-3"
              v-if="biodata.role == 'mahasiswa'"
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
              v-if="biodata.role == 'dosen' || biodata.role == 'pegawai'"
            >
              <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
              <p style="line-height: 14px; font-size: 14px">
                {{ $store.state.profil.skpd }}
              </p>
            </div>
            <div class="jurusan-wrapper mt-3" v-if="biodata.role == 'admin'">
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
          <div class="toolsdemo text-start" v-if="biodata.role == 'mahasiswa'">
            <div class="box-info">
              <div class="row">
                <div class="col">
                  <div class="text-tagihan">
                    Halo, {{ biodata.nama_lengkap_users }} (
                    {{ biodata.identity }} )
                  </div>
                  <div class="text-tagihan">{{ status_mahasiswa }}</div>
                  <div v-if="!lunas">
                    <div class="text-tagihan">
                      Anda memiliki tagihan biaya pendidikan sebesar : Rp.
                      {{ convert(isHerreg.biaya_kuliah) }}
                    </div>
                    <!-- <div class="text-tagihan">
                      
                      <span style="color: grey"
                        >pada semester
                        {{ $store.state.semester.nama_semester }}</span
                      >
                    </div> -->
                    <div v-if="!deadline" class="text-tagihan">
                      Silahkan Lakukan Pembayaran Biaya Studi Melalui Aplikasi
                      Simadu V2
                      <!-- <button
                      class="button-payment"
                      @click="$router.push('/payment')"
                    >
                      Bayar Sekarang
                    </button> -->
                    </div>
                    <div v-else class="text-tagihan">
                      Periode Pembayaran sudah berakhir untuk melanjutkan
                      silahkan hubungi bagian administrasi Kampus Poltekkes
                      Kemenkkes Semarang
                    </div>
                    <div class="text-invoice">
                      NO. INVOICE : {{ payment.trx_id }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div class="d-xl-none d-lg-none d-md-none">
        <section v-if="biodata">
          <div class="row glass-hp">
            <div class="col">
              <div class="dashboard-hp">
                <div class="user">
                  <div>
                    <img
                      v-if="!backup"
                      class="foto mb-3"
                      :src="biodata.foto"
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
                    <p>{{ biodata.nama_lengkap_users }}</p>
                  </div>
                  <div class="role">
                    <div v-if="biodata.role == 'pegawai'">
                      <p class="mr-1">TENDIK</p>
                    </div>
                    <div v-else>
                      <p class="mr-1">
                        {{ biodata.role.toUpperCase() }}
                      </p>
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
                <div
                  class="jurusan-wrapper mt-3 text-center"
                  v-if="biodata.role == 'mahasiswa'"
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
                  v-if="biodata.role == 'dosen' || biodata.role == 'pegawai'"
                >
                  <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
                  <p style="line-height: 14px; font-size: 14px">
                    {{ $store.state.profil.skpd }}
                  </p>
                </div>
                <div
                  class="jurusan-wrapper mt-3 text-center"
                  v-if="biodata.role == 'admin'"
                >
                  <!-- <h5 style="line-height: 14px">Jurusan</h5> -->
                  <p style="line-height: 14px; font-size: 14px">Admin</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row glass-hp">
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
          </div> -->
          <!-- <div class="row glass-hp">
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
          </div> -->
          <div
            class="toolsdemo-hp text-start"
            v-if="biodata.role == 'mahasiswa'"
          >
            <div class="box-info">
              <div class="row">
                <div class="col">
                  <div class="text-tagihan">
                    Halo, {{ biodata.nama_lengkap_users }}
                  </div>
                  <div class="text-tagihan">({{ biodata.identity }} )</div>
                  <div class="text-tagihan text-justify">
                    {{ status_mahasiswa }}
                  </div>
                  <div v-if="!lunas">
                    <div class="text-tagihan">
                      Anda memiliki tagihan biaya pendidikan sebesar : Rp.
                      {{ convert(isHerreg.biaya_kuliah) }}
                    </div>
                    <!-- <div class="text-tagihan">
                      
                      <span style="color: grey"
                        >pada semester
                        {{ $store.state.semester.nama_semester }}</span
                      >
                    </div> -->
                    <div v-if="!deadline" class="text-tagihan text-justify">
                      Silahkan Lakukan Pembayaran Biaya Studi Melalui Aplikasi
                      Simadu V2
                      <!-- <button
                      class="button-payment"
                      @click="$router.push('/payment')"
                    >
                      Bayar Sekarang
                    </button> -->
                    </div>
                    <div v-else class="text-tagihan text-justify">
                      Periode pembayaran biaya studi sudah berakhir untuk
                      melanjutkan silahkan hubungi bagian administrasi Kampus
                      Poltekkes Kemenkes Semarang
                    </div>
                    <div class="text-invoice">
                      NO. INVOICE : {{ payment.trx_id }}
                    </div>
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
                <div class="ellipsis two-lines">
                  <p>{{ item.deskripsi_client }}</p>
                </div>
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
    <add />
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
      app: "",
      popup: "",
      backup: false,
      foto: null,
    };
  },
  created() {
    this.get_app();
    if (this.biodata.role == "mahasiswa") {
      this.getData();
      this.getTagihan();
      this.get_cuti();
      this.get_detail_herreg();
    }
  },
  computed: {
    deadline() {
      let x =
        this.$moment().diff(this.$moment(this.payment.bayar_tutup), "seconds") >
        0;
      return x;
    },
    payment() {
      if (this.$store.state.payment) {
        return this.$store.state.payment;
      } else {
        return false;
      }
    },
    biodata() {
      return this.$store.state.biodata;
    },
    semester() {
      if (this.$store.state.semester) {
        return this.$store.state.semester;
      } else {
        return false;
      }
    },
    isHerreg() {
      if (this.$store.state.herreg) {
        return this.$store.state.herreg;
      } else {
        return false;
      }
    },
    isCuti() {
      if (this.$store.state.cuti) {
        return this.$store.state.cuti;
      } else {
        return false;
      }
    },
    lunas() {
      if (this.payment) {
        return this.$store.state.payment.status_tagihan >= 1;
      } else {
        return false;
      }
    },
    status_mahasiswa() {
      let vm = this;
      if (!vm.isCuti && !vm.isHerreg && vm.semester) {
        return `Anda belum menentukan status akademik anda untuk semester ${this.semester.nama_semester} , silahkan login ke aplikasi Simadu V2 untuk menentukan status akademik anda`;
      } else if (vm.isCuti && vm.semester && vm.payment) {
        if (vm.isCuti.status_pengajuan == 1) {
          return "Pengajuan cuti anda sedang di verifikasi";
        } else if (vm.isCuti.status_pengajuan == 0) {
          return "Pengajuan cuti anda ditolak untuk merubah status aktif atau pengajuan banding silahkan login melalui aplikasi Simadu V2";
        } else if (vm.isCuti.status_pengajuan == 2 && !vm.lunas) {
          return "Pengajuan cuti anda disetujui untuk melanjutkan segera lunasi tagihan akademik anda melalui aplikasi Simadu V2";
        } else if (vm.isCuti.status_pengajuan == 3 && vm.lunas) {
          return `Status anda adalah Mahasiswa Cuti untuk semester ${this.semester.nama_semester} Poltekkes Kemenkes Semarang`;
        } else {
          return "";
        }
      } else if (vm.isHerreg && vm.semester) {
        if (vm.isHerreg && !vm.lunas) {
          return `Anda memilih untuk Aktif pada semester ${this.semester.nama_semester}, segera lunasi tagihan anda untuk melanjutkan proses kegiatan akademik  `;
        } else if (vm.isHerreg && vm.lunas) {
          return `Anda adalah Mahasiswa Aktif semester ${this.semester.nama_semester} Poltekkes Kemenkes Semarang`;
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
  },
  methods: {
    async get_app() {
      let vm = this;

      let biodata = await vm.$axios.get(
        "users/detailsById/" + vm.$store.state.sso_user_id
      );
      vm.$store.dispatch("set_biodata", biodata.data.data[0]);
      if (biodata.data.profil[0]) {
        vm.$store.dispatch("set_profil", biodata.data.profil[0]);
      } else {
        vm.$store.dispatch("set_profil", {});
      }

      let app = await vm.$axios.get(
        "client/clientsByRole/" + vm.$store.state.sso_user_role
      );
      // console.log(app.data.data)

      vm.$store.dispatch("set_app", app.data.data, "app");
    },
    async getData() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      try {
        let tahun_aktif = await vm.$axiossimadu.post(
          "tahunAjaran/listTahunAjaranByPeriodeAktif",
          {
            a_periode_aktif_tahun_ajaran: 1,
          }
        );
        vm.$store.commit("set_tahun", tahun_aktif.data.data[0]);

        let semester = await vm.$axiossimadu("semester/listSemesterAKtif");
        // console.log(semester.data.data, "semester");
        vm.$store.commit("set_semester", semester.data.data[0]);

        vm.$store.dispatch("set_loading", false);
      } catch (error) {
        vm.$store.dispatch("set_loading", false);
        console.log(error.response);
      }
    },
    async getTagihan() {
      let vm = this;
      let tagihan = await vm.$axiossimadu.post(
        "masterUser/cekTagihanUserBySemesterId",
        {
          NIM_DTS: vm.$store.state.biodata.identity,
          semester_id: vm.semester.semester_id,
        }
      );
      console.log(tagihan, "tagihan");
      if (tagihan.data.status == 200) {
        if (tagihan.data.data.length) {
          vm.$store.dispatch("payment", tagihan.data.data[0]);
        }
      }
    },

    async get_cuti() {
      let vm = this;
      try {
        let cuti = await vm.$axiossimadu.post("pengajuanCuti/cekCuti", {
          NIM: vm.$store.state.biodata.identity,
          semester_id: vm.$store.state.semester.semester_id,
        });

        if (cuti.data.status == 200) {
          vm.$store.commit("set_cuti", cuti.data.data[0]);
        }
        // console.log(cuti, "cuti", this.$store.state.cuti);
      } catch (err) {
        console.log(err);
      }
    },
    async get_detail_herreg() {
      let vm = this;
      let herreg = await vm.$axiossimadu.post(
        "heregistrasiMahasiswa/detailsHerregMahasiswa",
        {
          NIM: vm.$store.state.biodata.identity,
          tahun_ajaran_id: vm.$store.state.tahun.id,
          semester_id: vm.$store.state.semester.semester_id,
        }
      );
      console.log(herreg.data.data, "herreg");

      if (herreg.data.status == 200) {
        vm.$store.commit("set_herreg", herreg.data.data[0]);
      }
    },

    goApp(x) {
      window.open(
        x.redirect_uri +
          "?token=" +
          this.$store.state.sso_access_token +
          "&refresh=" +
          this.$store.state.sso_refresh_token
      );
    },
    set_no_profil(x) {
      this.foto = x;
      this.backup = true;
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

.toolsdemo-hp {
  display: flex;
  width: 100%;
  height: auto;
  display: flex;
  gap: 24px;
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
  height: 135px;
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
  text-align: justify;
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

/* ellipse */
.ellipsis {
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.two-lines {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
}
</style>
