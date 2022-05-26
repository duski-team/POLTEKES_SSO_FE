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
        <center>
          <button type="button" class="btn btn-secondary" @click="show = false">
            Tutup
          </button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </center>
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
    };
  },
  mounted() {
    this.getpopup();
  },
  methods: {
    async getpopup() {
      let vm = this;
      let popup = await vm.$axios.get("pop_up/list");
      // console.log(popup.data.data[0]);
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
  },
};
</script>

<style scoped>
.card {
  position: fixed;
  z-index: 999;
}
</style>
