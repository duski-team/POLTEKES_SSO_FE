<template>
  <!-- <div><Header /></div> -->
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="box-bill" v-if="!open">
          <div class="card text-center">
            <div class="card-body">
              <img
                src="@/assets/logo-poltekes.jpg"
                alt=""
                style="height: 70px; width: 70px; margin-bottom: 5mm"
              />

              <h5 class="SSO mb-4">TAGIHAN BIAYA</h5>
              <!-- <h5 class="card-title mb-4">Poltekes Semarang</h5> -->
              <div class="card-body">
                <div class="row box-title">
                  <div class="col title">Nama Mahasiswa</div>
                  <div class="col title">
                    <span>: </span>{{ $store.state.biodata.nama_lengkap_users }}
                  </div>
                </div>
                <div class="row box-title">
                  <div class="col title">Tahun Ajaran</div>
                  <div class="col title"><span>: </span></div>
                </div>
                <div class="row box-title">
                  <div class="col title">Jenis Tagihan</div>
                  <div class="col title">
                    <span>: {{ $store.state.payment.nama_kategori }} </span>
                  </div>
                </div>
                <div class="row box-title">
                  <div class="col title">Prodi</div>
                  <div class="col title">
                    <span>: {{ $store.state.payment.nama_prodi }} </span>
                  </div>
                </div>
                <div class="row box-title">
                  <div class="col title">Jumlah Tagihan</div>
                  <div class="col title">
                    <span>: Rp. {{ convert($store.state.payment.totalTagihan) }} </span>
                  </div>
                </div>
                <div class="row box-title">
                  <div class="col title">Status Tagihan</div>
                  <div class="col title">
                    <span v-if="$store.state.payment.status_tagihan == 1">: Lunas </span>
                    <span v-if="$store.state.payment.status_tagihan == 0"
                      >: Belum Lunas
                    </span>
                  </div>
                </div>
                <div class="row box-title mt-4">
                  <button class="btn btn-outline-primary" @click="open = true">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <method :open="open" @close="open = false" :tagihan="tagihan" />
  </div>
</template>

<script>
// import qs from "qs";
import method from "./paymentMethod.vue";
// import Header from "@/components/header";

export default {
  name: "Home",
  components: {
    method,
    // Header,
  },
  data() {
    return {
      data: {
        username: "",
        password: "",
        grant_type: "password",
        client_secret: "SSO",
        client_id: "a5e1397c-c227-42c4-b188-0297f9afa990",
      },
      tagihan: "",
      variant: "",
      show: false,
      msg: "",
      open: false,
    };
  },
  created() {
    this.$store.dispatch("set_loading", false);
    this.getTagihan();
  },
  methods: {
    async getTagihan() {
      let vm = this;
      let tagihan = await vm.$axiosbilling.post(
        "detailsTagihanStudi/listDetailsTagihanStudiByNIM",
        {
          nim: "12345678900",
        }
      );
      console.log(tagihan)
      vm.$store.dispatch('payment', tagihan.data.data[0])
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
.container-fluid {
  /* background-image: url('@/assets/gedung.jpeg') */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  /* background-color:  rgba(225, 225, 225, 0.1); */
  /* padding: 7%; */
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
}
.box-title {
  margin-bottom: 5mm;

  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
}
.box-title {
  margin-bottom: 5mm;
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 20px;
}
.box-title {
  margin-bottom: 5mm;
}

.title {
  width: 100%;
  /* max-width: 40rem; */
  font-size: 16px;
  line-height: 24px;
  text-align: start;
  font-weight: 800;
  color: #667085;
}

.alert {
  font-size: 10px;
  color: red;
}

.card {
  width: 100%;
  max-width: 540px;
  padding: 3rem 1.5rem;
  height: 696px;

  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: #ffffff;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
}

/* .card:hover {
  width: 90%;
  max-width: 440px;
  padding: 5rem 2.5rem;
  height: 696px;

  border-radius: 1rem;
  border: 1px solid transparent;
  color: black;
  background-color: #ffffff; */
/* background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  ); */

/* backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */

/* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
/* } */

.btn {
  width: 100%;
  background-color: #027a48;
  color: #ffffff;
  letter-spacing: 1px;
}
.register {
  font-size: 14px;
}

.register-box {
  justify-content: space-between;
}
.register-text {
  color: #027a48;
  cursor: pointer;
  text-align: right;
}
/* .register:hover {
  transform: scale(1.1);
  font-size: 16px;
  font-weight: 500;
  color: blue;
} */

.lupa {
  font-size: 14px;
  font-weight: 500;
  color: #d92d20;
  display: flex;
  justify-content: space-between;
  line-height: 16px;
  cursor: pointer;
}

.lupa:hover {
  transform: scale(1.01);
  font-size: 14px;
  font-weight: 500;
  color: #d92d20;
  line-height: 16px;
  cursor: pointer;
}
</style>
