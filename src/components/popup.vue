<template>
  <div class="container-fluid">
    <div class="card" v-if="show">
      <div class="card-header">
        <h5 class="card-title">
          {{ popup.judul_pop_up }}
        </h5>
        <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="card"
              aria-label="Close"
            ></button> -->
      </div>
      <div class="card-body">
        <span v-html="popup.text_pop_up"></span>
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
                  Jangan Tampilkan Lagi
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
    if (!this.$store.state.popup) {
      this.getpopup();
    }
  },
  methods: {
    async getpopup() {
      let vm = this;
      console.log(vm.$store.state.biodata);
      let popup = await vm.$axios.get(
        "pop_up/listByRole/" + vm.$store.state.biodata.role
      );
      vm.popup = popup.data.data[0];
      if (popup) {
        this.show = true;
        // let x = new bootstrap.card(
        //   document.getElementById("examplecardCenter"),
        //   {}
        // );
        // x.show();
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
  height: 40%;
  z-index: 9999999999;
  overflow: hidden;
  backdrop-filter: blur(0.09rem);
}
</style>
