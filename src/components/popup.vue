<template>
  <div class="container-fluid">
    <div class="card" v-if="show && popup">
      <div class="card-header">
        <h5 class="card-title">INFORMASI</h5>
      </div>
      <div class="card-body">
        <div v-for="(item, idx) in popup" :key="idx">
          <div>{{ item.judul_pop_up }}</div>
          <div class="card-body">
            <span v-html="item.text_pop_up"></span>
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
                  @change="$store.dispatch('set_popup', status), ihir()"
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
      vm.popup = popup.data.data;
      console.log(popup);
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
  position: fixed;
  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
  z-index: 9999999999;
  backdrop-filter: blur(0.09rem);
}

.card-body {
  overflow-y: auto;
}
</style>
