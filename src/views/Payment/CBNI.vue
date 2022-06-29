<template>
  <div class="container">
    <div class="cara-box">
      <div class="bank">
        <div>Total Tagihan</div>
        <div>Rp. {{ convert($store.state.payment.totalTagihan) }}</div>
      </div>

      <div class="bank">
        <div>BANK</div>
        <div><img src="@/assets/BNILOGO.png" alt="" /></div>
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
        <div>{{ kadaluarsaVa }}</div>
        <div v-if="today">Expired</div>
      </div>

      <div class="mb-4 mt-4">
        <center>
          <button
            class="btn btn-outline-success CreateVa"
            @click="createVA()"
            :disabled="cek.datetime_created"
            v-if="!cek.datetime_created"
          >
            Create Virtual Account
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
              <p>Kemudian, pilih Menu Lainnya.</p>
            </div>
            <div class="text-cara-line">
              <p>5.</p>
              <p>
                Pilih Transfer dan pilih Jenis rekening yang akan Anda gunakan
                (Contoh: “Dari Rekening Tabungan”).
              </p>
            </div>
            <div class="text-cara-line">
              <p>6.</p>
              <p>
                Pilih Virtual Account Billing. Masukkan nomor Virtual Account
                Anda <span style="color: green">{{ Va }}</span> .
              </p>
            </div>
            <div class="text-cara-line">
              <p>7.</p>
              <p>
                Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.
              </p>
            </div>
            <div class="text-cara-line">
              <p>8.</p>
              <p>Konfirmasi, apabila telah sesuai, lanjutkan transaksi.</p>
            </div>
            <div class="text-cara-line">
              <p>9.</p>
              <p>Transaksi Anda telah selesai.</p>
            </div>
          </div>
        </div>

        <div @click="steps('IB')" class="card-cara">
          <div class="card-cara-button">
            <span>Mobile Banking BNI</span>
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
              <p>Akses BNI Mobile Banking melalui handphone.</p>
            </div>
            <div class="text-cara-line">
              <p>2.</p>
              <p>Masukkan User ID dan password.</p>
            </div>
            <div class="text-cara-line">
              <p>3.</p>
              <p>Pilih menu Transfer.</p>
            </div>
            <div class="text-cara-line">
              <p>4.</p>
              <p>
                Pilih menu Virtual Account Billing, lalu pilih rekening debet.
              </p>
            </div>
            <div class="text-cara-line">
              <p>5.</p>
              <p>
                Masukkan nomor Virtual Account Anda
                <span style="color: green">{{ Va }}</span>
                pada menu Input Baru.
              </p>
            </div>
            <div class="text-cara-line">
              <p>6.</p>
              <p>
                Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.
              </p>
            </div>
            <div class="text-cara-line">
              <p>7.</p>
              <p>Konfirmasi transaksi dan masukkan Password Transaksi.</p>
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
export default {
  props: ["tagihan"],
  name: "CBNI",
  data() {
    return {
      cara: false,
      metode: 0,
      step: "",
      cek: "",
      date:"",
      trx_id:""
    };
  },
  computed: {
    Va() {
      let vm = this;
      let x = vm.$store.state.biodata.identity;
      return (
        vm.$store.state.bni_prefix +
        vm.$store.state.bni_client_id +
        x.substring(x.length - 8)
      );
    },
    kadaluarsaVa() {
      let vm = this;
      return vm.$moment(vm.date).format("HH:mm:ss");
    },
    today() {
      let x = this.cek.datetime_expired < this.$moment();
      console.log(x);
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
      console.log(vm.$store.state.payment.trx_id + vm.$store.state.payment.sufix)
      let cek = await vm.$axiosbilling.post("bni/detailsById", {
        trx_id: vm.$store.state.payment.trx_id + vm.$store.state.payment.sufix
      });
      console.log(cek, "cek");
      vm.cek = cek.data.data[0];
      let x = vm.$moment()
      let y = vm.cek.datetime_expired
      vm.date = vm.$moment.duration(x.diff(y)).asHours()
      vm.setTimer()
      vm.$store.dispatch("set_loading", false);
    },
    setTimer(){
      let vm = this
      clearInterval()
      setInterval(() => {
        this.date = vm.$moment(this.date).subtract(1, "seconds");
      }, 1000);
    },
    async cekCreated2() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      console.log(vm.$store.state.payment.trx_id + vm.$store.state.payment.sufix)
      let cek = await vm.$axiosbilling.post("bni/detailsById", {
        trx_id: vm.trx_id
      });
      console.log(cek, "cek2");
      vm.cek = cek.data.data[0];
      let x = vm.$moment()
      let y = vm.cek.datetime_expired
      vm.date = vm.$moment.duration(x.diff(y)).asHours()
      vm.setTimer()
      vm.$store.dispatch("set_loading", false);
    },
    async createVA() {
      let vm = this;
      vm.$store.dispatch("set_loading", true);
      let create = await vm.$axiosbilling.post("bni/register", {
        nim: vm.$store.state.biodata.identity,
      });
      console.log(create);
      if (create.data.status == 200) {
        if (create.data.message == "sukses") {
          vm.$store.dispatch("set_loading", false);
          vm.$store.dispatch("set_alert_show_success", create.data.message);
          vm.trx_id = create.data.data[0].trx_id
          
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
      vm.cekCreated2()
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
/* .container-fluid {
  
} */
.cara-box {
  height: auto;
  width: 100%;
  text-align: start;
  border-radius: 1rem;
  border: 1px solid transparent;
  overflow-y: auto;
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
