<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="cb1 m-2">
          <img src="@/assets/kebijakan.jpg" alt="" />
          <h5 class="SSO mb-4">User Agreement SSO</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <span v-html="agrement"></span>
    </div>
    <div class="row d-flex justify-content-center mt-4">
      <!-- <div class="col-md-2 btn-red"><p>Lihat</p></div> -->
      <button class="col-md-2 btn-green" @click="setuju()"><p>Setuju</p></button>
    </div>
  </div>
</template>

<script>
export default {
  props:['state'],
  data() {
    return {
      data: {
        syarat_kebijakan: 0,
        step: "step4",
      },
      agrement: "",
    };
  },
  mounted() {
    this.getAgrement();
  },
  methods: {
    setuju() {
      let vm = this;
      vm.data.syarat_kebijakan = 1;
      vm.$emit("kebijakan", vm.data);
    },
    async getAgrement() {
      let vm = this;
      let agre = await vm.$axios.get("pop_up/listByRole/" + "userAgrement");

      vm.agrement = agre.data.data[0].text_pop_up;
      // console.log(agre.data.data[0],'agres')
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  /* margin: 0;
    padding: 0; */
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.container-fluid {
  /* background-image: url("https://picsum.photos/seed/picsum/200/300"); */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
  padding: 75px 25px 75px 25px;
  /* background-color: red; */
  /* color: aqua; */
}

.SSO {
  font-size: 30px;
  line-height: 38px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 0px;
  margin-top: 20px;
}
.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  font-weight: 400;
  color: #667085;
}
.cb1 {
  text-align: center;
}

.card {
  background-color: #ffffff;
  height: 324px;
  width: 280px;
  border-radius: 12px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  border-radius: 12px;
}

.card2 {
  background-color: #ffffff;
  height: 324px;
  width: 280px;
  border-radius: 12px;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0px 2px 4px -2px rgba(16, 24, 40, 0.06),
    0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  border-radius: 12px;
}
.btn-green {
  margin-top: 20px;
  width: 122px;
  height: 44px;
  background-color: #027a48;
  color: #ffffff;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
}

.btn-red {
  margin-top: 20px;
  width: 122px;
  height: 44px;
  background-color: #d92d20;
  color: #ffffff;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
}

.btn:disabled {
  margin-top: 20px;
  width: 92px;
  height: 44px;
  background-color: black;
  color: #ffffff;
}
</style>
