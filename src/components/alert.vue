<template>
  <div class="container-fluid" @click="$store.dispatch('set_alert_hide')">
    <div
      v-if="$store.state.show"
      class="card text-white"
      :style="$store.state.backColor"
    >
      <div class="card-body">
        <center>
            <span v-html="$store.state.alert"></span>
        </center>
        
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap from "bootstrap/dist/js/bootstrap.js";

export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  position: fixed;
  left: calc(50% - 250px);
  top: 30%;
  width: 500px;
  height: 300;
  z-index: 9999999999;
  overflow: hidden;
  backdrop-filter: blur(0.09rem);
  border-radius: 15px;
}
</style>
