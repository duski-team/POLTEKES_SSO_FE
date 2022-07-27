<template>
  <div class="container">
    <div class="card" v-if="warning">
      <div class="card-header">
        <h5 class="card-title">INFORMASI</h5>
      </div>
      <div class="card-body" v-if="popup.length">
        <div v-for="(item, idx) in popup" :key="idx">
          <div v-if="item.file_pop_up">
            <center>
              <img
                :src="item.src1"
                alt=""
                style="height: 100px; width: 100px; margin: 25px 0px 25px 0px"
              />
            </center>
          </div>
          <div>
            <span v-html="item.text_pop_up"></span>
          </div>
        </div>
      </div>
      <!-- <div v-else>
            <center>
              <img
                src="@/assets/logo-poltekes2.svg"
                alt=""
                style="height: 100px; width: 100px; margin: 25px 0px 25px 0px"
              />
            </center>
          </div>
          <div class="card-body">
            <span>
              <center>
                <h1 class="text-danger">SERVER SEDANG DALAM MAINTENANCE</h1>
              </center></span
            >
      </div> -->

      <div class="card-footer bg-warning">
        <div>
          <!-- <hr /> -->
          <div align="right">
            <button
              type="button"
              class="btn btn-secondary"
              @click="warning = false"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
  data() {
    return {
      popup: "",
      show: false,
      status: true,
      warning: true,
    };
  },
  mounted() {
    // console.log(this.$store.state.sso_user_role)
    this.getpopup();
  },
  methods: {
    async getpopup() {
      try {
        let vm = this;
        let popup = await vm.$axios.get("pop_up/listByRole/" + "regis");
        console.log(popup);

        vm.popup = await popup.data.data.map((item) => {
          if (item.file_pop_up) {
            item.src1 = this.ip + "/" + item.file_pop_up;
          }
          return item;
        });

        if (vm.popup.length) {
          this.warning = true;
        } else {
          this.warning = false;
        }
      } catch (error) {
        console.log(error.message);
        this.show = true;
      }
    },
    ihir() {
      console.log(this.status);
    },
  },
};
</script>

<style scoped>
.card {
  position: absolute;
  left: 25%;
  top: 15%;
  width: 50%;
  height: 50%;
  z-index: 77777;
  backdrop-filter: blur(0.09rem);
}

.card-body {
  overflow-y: auto;
  padding: 7mm;
}
</style>
