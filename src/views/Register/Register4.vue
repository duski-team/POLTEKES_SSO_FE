<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col d-flex justify-content-center">
        <div class="cb1 m-2 text-center">
          <img src="@/assets/email.jpg" alt="" />
          <h5 class="SSO mb-4">Periksa Email Anda</h5>
          <h5 class="card-title mb-4 mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </h5>
          <h5 class="card-title mb-4 mt-4">
            <p class="kirim" @click="kirim()">Click here</p>
            if you did not receive an email or would like to change the email
            address you signed up with.
          </h5>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-4">
      <div class="col-md-6 btn-green" @click="login()">
        <p>Update Password Anda dan Login</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        syarat_kebijakan: 0,
        step: "step4",
      },
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$router.push({ path: "/" });
    },
    async kirim() {
      let vm = this;
      let kirim = await vm.$axios.post("users/kirimUlangOTP", vm.data);
      console.log(kirim);
      if (kirim.data.status == 201) {
        vm.msg = kirim.data.message;
        vm.showing = true;
        setTimeout(() => {
          vm.showing = false;
        }, 4000);
      } else {
        localStorage.setItem("username", this.data.username);
        this.$router.push({ path: "/OTP" });
      }
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

.btn-green {
  margin-top: 20px;
  width: 362px;
  height: 44px;
  background-color: #027a48;
  color: #ffffff;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
}

.kirim {
  font-weight: 700;
  color: #1c3aa9;
}
</style>
