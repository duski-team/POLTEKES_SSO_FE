<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">INFORMASI</h5>
      </div>
      <div class="card-body" v-if="show && popup.length">
        <div v-for="(item, idx) in popup" :key="idx">
          <div v-if="item.file_pop_up">
            <center>
              <img
                :src="item.src1"
                alt=""
                style="
                  height: 100px;
                  width: 100px;
                  margin: 25px 0px 25px 0px;
                "
              />
            </center>
          </div>
          <div class="card-body">
            <span v-html="item.text_pop_up"></span>
          </div>
        </div>
      </div>
      <div class="card-body" v-else>
        <div>
          <div>
            <center>
              <img
                src="@/assets/logo-poltekes2.svg"
                alt=""
                style="
                  height: 100px;
                  width: 100px;
                  margin: 25px 0px 25px 0px;
                "
              />
            </center>
          </div>
          <div class="card-body">
            <center><span> <h1 class="text-danger">SERVER SEDANG DALAM MAINTENANCE</h1></span></center>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div>
          <!-- <hr /> -->
          <div class="d-flex justify-content-between">
            <div>
              <!-- <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="status"
                  :value="true"
                  @change="$store.dispatch('set_popup', status), ihir()"
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Selalu Tampilkan
                </label>
              </div> -->
              <!-- <b-form-checkbox
                id="checkbox-1"
                v-model="status"
                name="checkbox-1"
                :value="false"
                :unchecked-value="true"
                @change="$store.commit('set_popup', status)"
              >
                Jangan tampilkan notifikasi lagi
              </b-form-checkbox> -->
            </div>
            <div>
              <button
                type="button"
                class="btn btn-secondary"
                @click="this.show = false"
              >
                Tutup
              </button>
            </div>
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
    };
  },
  mounted() {
    // console.log(this.$store.state.sso_user_role);
    if (this.$store.state.popup) {
      this.getpopup();
    }
  },
  methods: {
    async getpopup() {
      let vm = this;
      let popup = await vm.$axios.get("pop_up/listByRole/" + "regis");
      vm.popup = await popup.data.data.map((item) => {
        if (item.file_pop_up) {
          item.src1 = this.ip + "/" + item.file_pop_up;
        }
        return item;
      });
      console.log(popup);
      if (popup) {
        this.show = true;
      } else{
        this.show = true
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
