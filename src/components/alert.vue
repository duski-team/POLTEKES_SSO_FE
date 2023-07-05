<template>
  <div class="container-fluid" @click="$store.dispatch('set_alert_hide')">
    <div v-if="show" class="card text-white" :style="color">
      <div class="card-body">
        <center>
          <span v-html="alert"></span>
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
  computed: {
    show() {
      return this.$store.state.show ? this.$store.state.show : false;
    },
    alert() {
      return this.$store.state.alert ? this.$store.state.alert : null;
    },
    color() {
      return this.$store.state.backColor ? this.$store.state.backColor : null;
    },
  },
  watch: {
    show: function (val) {
      console.log(val);
    },
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
