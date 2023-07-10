<template>
  <div class="container-fluid">
    <div class="card" v-if="show && popup.length">
      <div class="card-header">
        <h5 class="card-title">INFORMASI</h5>
      </div>
      <div class="card-body">
        <div class="menu-box">
          <div class="col menu-content h-100" v-if="popup.length">
            <div v-for="(item, idx) in popup" :key="idx">
              <div v-if="item.file_pop_up">
                <img
                  :src="item.src1"
                  alt=""
                  style="
                    height: auto;
                    width: 100%;
                    margin: 25px 0px 25px 0px;
                    border: solid black 2px;
                  "
                />
              </div>
              <div class="text-center">
                <h3>{{ item.judul_pop_up }}</h3>
              </div>
              <div class="card-body">
                <span v-html="item.text_pop_up"></span>
              </div>
            </div>
          </div>
          <div v-else class="col menu-content h-100">
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div>
          <!-- <hr /> -->
          <div class="d-flex justify-content-between">
            <div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="status"
                  :value="true"
                  @change="$store.dispatch('set_popup', status)"
                  id="flexCheckChecked"
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Selalu Tampilkan
                </label>
              </div>
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
    console.log(this.$store.state.sso_user_role);
    if (this.$store.state.popup) {
      this.getpopup();
    }
  },
  methods: {
    async getpopup() {
      let vm = this;
      let popup = await vm.$axios.get(
        "pop_up/listByRole/" + vm.$store.state.sso_user_role
      );
      vm.popup = await popup.data.data.map((item) => {
        if (item.file_pop_up) {
          item.src1 = this.ip + "/" + item.file_pop_up;
        }
        return item;
      });
      // console.log(popup);
      if (popup) {
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
  top: 25%;
  width: 50%;
  max-height: 600px;
  z-index: 9999999999;
  backdrop-filter: blur(0.09rem);
}

.card-body {
  overflow-y: auto;
  padding: 7mm;
}

.menu-box {
  flex-grow: 1;
  position: relative;
  width: 100%;
  /* max-height: 1000px; */
}

.menu-content {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  max-height: 800px;
  /* position: absolute; */
}
</style>
