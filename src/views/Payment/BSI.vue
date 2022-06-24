<template>
  <div class="container-fluid">
    <div class="cara-box">
      <div>Total Tagihan</div>
      <div>Rp. {{ "" }}</div>
      <div class="bank">
        <div>BANK BSI</div>
        <div><img src="@/assets/BSILOGO.png" alt="" /></div>
      </div>

      <div>Nomor VA</div>
      <div class="mb-4 mt-4">
        <center>
          <button class="btn btn-outline-success CreateVa">
            Create Virtual Account
          </button>
        </center>
      </div>

      <div @click="cara = !cara" style="margin-bottom: 20px">
        <font-awesome-icon icon="fa-regular fa-circle-question" />
        <span> Cara Bayar </span>
        <font-awesome-icon
          v-if="cara"
          icon="fa-regular fa-square-caret-up"
        /><font-awesome-icon v-else icon="fa-regular fa-square-caret-down" />
      </div>

      <div>
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
                Anda (Contoh: 8277087781881441).
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
                Masukkan nomor Virtual Account Anda (Contoh: 8277087781881441)
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
  data() {
    return {
      cara: false,
      metode: 0,
      step: "",
    };
  },
  methods: {
    steps(x) {
      if (this.step == x) {
        this.step = "";
      } else {
        this.step = x;
      }
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

.createVa {
  color: #ffffff;
  background-color: #027a48;
}
</style>
