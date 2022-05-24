<template>
  <div class="container-fluid">
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      aria-labelledby="exampleModalCenter"
      aria-hidden="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ popup.judul_pop_up }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <span v-html="popup.text_pop_up"></span>
          </div>
          <div class="modal-footer">
            <center>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["popup"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.modal{
    position: fixed;
}
</style>
