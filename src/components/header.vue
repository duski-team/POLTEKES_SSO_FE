<template>
  <!-- <iv> -->
  <div class="na">
    <div class="row pt-2">
      <div class="col-8" @click="$router.push({ path: '/' })">
        <div class="d-flex">
          <img class="logo" src="@/assets/logo2.svg" alt="" />
          <p class="poltek">Poltekkes Semarang</p>
        </div>
      </div>
      <div class="col-4">
        <div class="dropdown">
          <div
            class="d-flex text-left dropdown"
            id="dropdownMenuProfil"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div>
              <img class="avatar" src="https://picsum.photos/100/100" alt="" />
            </div>
            <div>
              <p class="nama mb-0">{{ data.nama_lengkap_users }}</p>
              <p class="email">{{ data.username }}</p>
            </div>
          </div>
          <div
            class="dropdown-menu text-start"
            aria-labelledby="dropdownMenuProfil"
          >
            <a
              class="dropdown-item logout"
              @click="$router.push({ path: '/profil' })"
              >Lihat Profil</a
            >
            <a class="dropdown-item logout" @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      data: "",
      options: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let vm = this;
      try {
        let biodata = await vm.$axios.get(
          "users/detailsById/" + vm.$store.state.sso_user_id
        );
        console.log(biodata);
        vm.data = biodata.data.data[0];
      } catch (error) {
        console.log(error.response);
      }
    },
    logout() {
      this.$store.dispatch("clear_token");
      this.$router.push({ path: "/" });
      console.log("logout");
    },
  },
};
</script>

<style scoped>
.na {
  height: 73px;
  background-color: #027a48;
  color: #ffffff;
  margin-bottom: 20px;
}

.logo {
  height: 44px;
  width: 44px;
  margin-left: 54px;
}
.avatar {
  height: 44px;
  width: 44px;
  margin-right: 20px;
  border-radius: 50px;
}

.poltek {
  font-size: 30px;
  line-height: 38px;
  font-weight: 400;
  letter-spacing: 2px;
  margin-left: 37px;
  text-align: center;
  margin-top: 7px;
}
.nama {
  text-align: start;
}

.email {
  font-weight: 300;
  font-size: 14px;
}

.card {
  padding: 20px;
}

.logout {
  color: black;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  padding: 10px;
}
</style>
