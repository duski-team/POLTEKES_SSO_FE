<template>
  <div class="container-fluid">
    <div class="cara-box">
      <div class="bank">
        <div>Total Tagihan</div>
        <div>Rp. {{ convert($store.state.payment.totalTagihan) }}</div>
      </div>

      <div class="bank">
        <div>BANK</div>
        <div><img src="@/assets/BSILOGO.png" alt="" /></div>
      </div>
      <div class="bank">
        <div>Nama</div>
        <div>{{ $store.state.biodata.nama_lengkap_users }}</div>
      </div>
      <div class="bank" v-if="cek.datetime_created">
        <div>Nomor VA</div>
        <div>{{ Va }}</div>
      </div>
      <div class="bank" v-if="cek.datetime_expired">
        <div>Kadaluarsa VA</div>
        <div v-if="!today">{{ kadaluarsaVa }}</div>
        <div v-else>Expired</div>
      </div>
      <div class="mb-4 mt-4" v-if="cek">
        <center>
          <button
            class="btn btn-outline-success CreateVa"
            @click="createVA()"
            v-if="!cek.datetime_created || today"
          >
            Create Virtual Account
          </button>
        </center>
      </div>

      <div class="mb-4 mt-4">
        <center>
          <button
            class="btn btn-outline-success CreateVa"
            @click="printBSI()"
            v-if="cek.datetime_created && !today"
          >
            Simpan Tagihan
          </button>
        </center>
      </div>

      <div
        @click="cara = !cara"
        style="margin-bottom: 20px"
        v-if="cek.datetime_created"
      >
        <font-awesome-icon icon="fa-regular fa-circle-question" />
        <span> Cara Bayar </span>
        <font-awesome-icon
          v-if="cara"
          icon="fa-regular fa-square-caret-up"
        /><font-awesome-icon v-else icon="fa-regular fa-square-caret-down" />
      </div>

      <div v-if="cek.datetime_created">
        <div @click="steps('ATM')" class="card-cara">
          <div class="card-cara-button">
            <span>ATM</span>
            <font-awesome-icon
              v-if="step == 'ATM'"
              icon="fa-regular fa-square-caret-up"
            /><font-awesome-icon
              v-else
              icon="fa-regular fa-square-caret-down"
            />
          </div>
          <div v-if="step == 'ATM'" class="text-cara mt-4">
            <div class="text-cara-line">
              <p>1.</p>
              <p>Masukkan Kartu Anda.</p>
            </div>
            <div class="text-cara-line">
              <p>2.</p>
              <p>Pilih Bahasa.</p>
            </div>
            <div class="text-cara-line">
              <p>3.</p>
              <p>Masukkan PIN ATM Anda.</p>
            </div>
            <div class="text-cara-line">
              <p>4.</p>
              <p>Kemudian, pilih Menu Payment / Pembayaran.</p>
            </div>
            <div class="text-cara-line">
              <p>5.</p>
              <p>Pilih Akademik.</p>
            </div>
            <div class="text-cara-line">
              <p>6.</p>
              <p>
                Masukkan nomor Virtual Account Anda
                <span style="color: green">{{ Va }}</span> .
              </p>
            </div>
            <div class="text-cara-line">
              <p>7.</p>
              <p>
                Kemudian tampil Informasi data transaksi anda, pastikan data
                sudah benar (Tagihan sudah termasuk biaya admin 2500).
              </p>
            </div>
            <div class="text-cara-line">
              <p>8.</p>
              <p>Pilih Benar / Iya.</p>
            </div>
            <div class="text-cara-line">
              <p>9.</p>
              <p>Transaksi Anda telah selesai.</p>
            </div>
          </div>
        </div>

        <div @click="steps('IB')" class="card-cara">
          <div class="card-cara-button">
            <span>Mobile Banking BSI</span>
            <font-awesome-icon
              v-if="step == 'IB'"
              icon="fa-regular fa-square-caret-up"
            /><font-awesome-icon
              v-else
              icon="fa-regular fa-square-caret-down"
            />
          </div>
          <div v-if="step == 'IB'" class="mt-4">
            <div class="text-cara-line">
              <p>1.</p>
              <p>Akses BSI Mobile Banking melalui handphone.</p>
            </div>
            <div class="text-cara-line">
              <p>2.</p>
              <p>Pilih menu Pembayaran / Payment.</p>
            </div>
            <div class="text-cara-line">
              <p>3.</p>
              <p>Pilih Akademik.</p>
            </div>
            <div class="text-cara-line">
              <p>4.</p>
              <p>
                Masukkan Kode Akademik <span style="color: green">(2576) </span> / Nama Akademik (POLTEKKES
                KEMENKES SEMARANG).
              </p>
            </div>
            <div class="text-cara-line">
              <p>5.</p>
              <p>Masukkan nomor Pembayaran <span style="color: green">{{noPelanggan}}</span> .</p>
            </div>
            <div class="text-cara-line">
              <p>6.</p>
              <p>
                Kemudia tampilan informasi data transaksi anda, pastikan data
                sudah benar (Tagihan sudah termasuk biaya adm 2500).
              </p>
            </div>
            <div class="text-cara-line">
              <p>7.</p>
              <p>Masukkan PIN anda dan pilih "Selanjutnya" untuk submit.</p>
            </div>
            <div class="text-cara-line">
              <p>8.</p>
              <p>Pembayaran Anda Telah Berhasil.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  data() {
    return {
      cara: false,
      metode: 0,
      step: "",
      cek: "",
      date: "",
      interval: "",
    };
  },
  computed: {
    Va() {
      let vm = this;
      let x = vm.$store.state.biodata.identity;
      return vm.$store.state.bsi_client_id + x.substring(x.length - 8);
    },
    noPelanggan(){
      return this.$store.state.biodata.identity.substring(this.$store.state.biodata.identity.length - 8);
    },
    kadaluarsaVa() {
      let vm = this;
      let h = vm.date.hours();
      let m = vm.date.minutes();
      let s = vm.date.seconds();
      if (Number(h) < 10) {
        h = "0" + h;
      }
      if (Number(m) < 10) {
        m = "0" + m;
      }
      if (Number(s) < 10) {
        s = "0" + s;
      }
      return `${h} : ${m} : ${s}`;
    },
    today() {
      let x = this.$moment(this.cek.datetime_expired) <= this.$moment();
      console.log(
        this.$moment().format("lll"),
        "moment",
        this.cek.datetime_expired,
        "exp",
        x
      );
      return x;
    },
  },
  mounted() {
    this.cekCreated();
  },
  methods: {
    steps(x) {
      if (this.step == x) {
        this.step = "";
      } else {
        this.step = x;
      }
    },
    async cekCreated() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      let cek = await vm.$axiosbilling.post("bsi/detailsById", {
        trx_id: vm.$store.state.payment.trx_id,
      });
      // console.log(cek.data.data, "cek");
      vm.cek = cek.data.data[0];
      vm.setTimer();
      vm.$store.dispatch("set_loading", false);
    },
    setTimer() {
      let vm = this;
      let interval = setInterval(() => {
        let now = vm.$moment();
        let expired = vm.$moment(vm.cek.datetime_expired);
        vm.date = vm.$moment.duration(expired.diff(now));
      }, 1000);
      vm.interval = interval;
      clearInterval(interval - 1);
    },
    async createVA() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      let create = await vm.$axiosbilling.post("bsi/register", {
        nim: vm.$store.state.biodata.identity,
      });
      console.log(create);
      if (create.data.status == 200) {
        if (create.data.message == "sukses") {
          vm.$store.dispatch("set_loading", false);
          vm.$store.dispatch("set_alert_show_success", create.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
        } else {
          // alert(create.data.message);
          vm.$store.dispatch("set_alert_show_fail", create.data.message);
          setTimeout(() => {
            vm.$store.dispatch("set_alert_hide");
          }, 2000);
          vm.$store.dispatch("set_loading", false);
        }
      } else {
        vm.$store.dispatch("set_loading", false);
        vm.$store.dispatch("set_alert_show_fail", create.data.message);
        setTimeout(() => {
          vm.$store.dispatch("set_alert_hide");
        }, 2000);
        console.log("error");
      }
      this.cekCreated();
    },
    convert(x) {
      if (x) {
        return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      }
    },
    printBSI() {
      let vm = this;
      window.open(
        vm.ip2 +
          "/detailsTagihanStudi/downloadTagihanBSI/" +
          vm.$store.state.biodata.identity,
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.container-fluid {
  overflow-y: auto;
}
.cara-box {
  min-height: 80%;
  width: 100%;
  text-align: start;
  border-radius: 1rem;
  border: 1px solid transparent;
  /* border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1); */
  /* background-color: rgba(225, 225, 225, 0.1); */
  /* box-shadow: 1rem 1rem 1rem 1rem rgba(0, 0, 0, 0.1); */
  background-color: rgba(225, 225, 225, 0.5);
  padding: 5px;
}
.card-cara {
  /* background-color: aqua; */
  min-height: 50px;
  margin-bottom: 10px;
  border-radius: 1rem;
  border: 1px solid transparent;
  border-bottom: 1px solid rgba(225, 225, 225, 0.1);
  box-shadow: 0rem 0rem 1rem 0rem rgba(0, 0, 0, 0.1);
  padding: 1em;
  overflow-y: auto;
}

.card-cara-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-cara {
  font-size: 16px;
  line-height: 17px;
}

.text-cara-line {
  display: flex;
  grid-gap: 15px;
}
.bank {
  display: flex;
  justify-content: space-between;
  padding-right: 5px;
  margin: 10px 0 10px 0;
}

img {
  width: 100%;
  height: 20px;
}

.CreateVa:hover {
  color: #ffffff;
  background-color: #027a48;
  transform: scale(1.09);
}
</style>
