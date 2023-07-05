<template>
  <div class="header">
    <div class="na d-none d-sm-block">
      <div class="row pt-2">
        <div class="col-8" @click="$router.push({ path: '/' })">
          <div class="d-flex">
            <img class="logo" src="@/assets/logo2.svg" alt="" />
            <p class="poltek">Poltekkes Semarang</p>
          </div>
        </div>
        <div class="col-4">
          <div class="dropdown" style="cursor: pointer">
            <div
              class="d-flex text-left dropdown"
              id="dropdownMenuProfil"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div v-if="$store.state.biodata != null">
                <img
                  v-if="!backup"
                  class="avatar"
                  :src="$store.state.biodata.foto"
                  alt=""
                  @error="backup = true"
                />
                <img v-else class="avatar" src="@/assets/noprofil.png" alt="" />
              </div>
              <div v-if="$store.state.biodata">
                <p class="nama mb-0">
                  {{ $store.state.biodata.nama_lengkap_users }}
                </p>
                <p class="email">{{ $store.state.biodata.username }}</p>
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
    <div class="na d-xl-none d-lg-none d-md-none">
      <div class="row pt-2">
        <div class="col-9" @click="$router.push({ path: '/' })">
          <div class="d-flex">
            <img class="logo-hp" src="@/assets/logo2.svg" alt="" />
            <!-- <p class="poltek">Poltekkes Semarang</p> -->
          </div>
        </div>
        <div class="col-3">
          <div class="dropdown" style="cursor: pointer">
            <div
              class="d-flex text-left dropdown"
              id="dropdownMenuProfil"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div v-if="$store.state.biodata != null">
                <img
                  v-if="!backup"
                  class="avatar-hp"
                  :src="$store.state.biodata.foto"
                  alt=""
                  @error="backup = true"
                />
                <img
                  v-else
                  class="avatar-hp"
                  src="@/assets/noprofil.png"
                  alt=""
                />
              </div>
              <div v-if="$store.state.biodata">
                <!-- <p class="nama mb-0">
                  {{ $store.state.biodata.nama_lengkap_users }}
                </p>
                <p class="email">{{ $store.state.biodata.username }}</p> -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      options: false,
      backup: false,
    };
  },
  mounted() {
    // this.getData();
  },
  methods: {
    async getData() {
      let vm = this;
      console.log(vm.$store.state.sso_user_id);
      vm.data = vm.$store.state.biodata;
      // console.log(vm.data);
      if (!vm.data) {
        try {
          let biodata = await vm.$axios.get(
            "users/detailsById/" + vm.$store.state.sso_user_id
          );
          console.log(biodata);
          vm.data = biodata.data.data[0];
          vm.$store.dispatch("set_biodata", vm.data);
        } catch (error) {
          console.log(error.response);
        }
      }
    },
    logout() {
      this.$store.dispatch("clear_token");
      // this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
      this.$router.push({ path: "/" });
      // console.log("logout");
    },
  },
};
</script>

<style scoped>
#header {
  margin: 0;
  padding: 0;
  width: 100vh;
}

#header #content {
  margin: 0px auto;
}

.na {
  height: 73px;
  background-color: #027a48;
  color: #ffffff;
  margin: 0 0 20px 0;
}

.logo {
  height: 44px;
  width: 44px;
  margin-left: 54px;
  cursor: pointer;
}

.logo-hp {
  height: 44px;
  width: 44px;
  margin-left: 14px;
  cursor: pointer;
}

.avatar {
  height: 44px;
  width: 44px;
  margin-right: 20px;
  border-radius: 50px;
}

.avatar-hp {
  height: 44px;
  width: 44px;
  margin-right: 10px;
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
  cursor: pointer;
}
.nama {
  text-align: start;
}
.row {
  --bs-gutter-x: 0;
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
