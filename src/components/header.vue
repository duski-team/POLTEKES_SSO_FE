<template>
  <!-- <iv> -->
  <div class="na">
    <div class="row pt-2">
      <div class="col-8" @click="$router.push({path:'/'})">
        <div class="d-flex">
          <img class="logo" src="@/assets/logo2.svg" alt="" />
          <p class="poltek">Poltekkes Semarang</p>
        </div>
      </div>
      <div class="col-4">
        <div>
          <div class="d-flex text-left">
            <div>
              <img class="avatar" src="@/assets/logo2.svg" alt="" />
            </div>
            <div>
              <p class="nama mb-0">{{data.nama_lengkap_users}}</p>
              <p class="email">{{data.username}}</p>
            </div>
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
    return{
      data:""
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      let vm = this
      try {
        let biodata = await vm.$axios.get(
          "users/detailsById/" + localStorage.getItem("SSO_client_id")
        );
        vm.data = biodata.data.data[0];
      } catch (error) {
        console.log(error.response);
      }
    },
  }
}
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
.nama{
  text-align: start;
}
</style>
