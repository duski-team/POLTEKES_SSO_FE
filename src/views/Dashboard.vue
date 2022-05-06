<template>
  <div
    class="container-fluid"
    :style="{
      'background-image': 'url(https://picsum.photos/seed/picsum/1000/1000)',
    }"
  >
    <div
      v-if="biodata != ''"
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <strong>Welcome!</strong> {{ biodata.nama_lengkap_users }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <section class="glass">
      <div class="dashboard">
        <div class="user">
          <img
            src="https://picsum.photos/200/300"
            alt=""
            style="height: 100px; width: 100px"
          />
          <div>
            <h3>{{ biodata.nama_lengkap_users }}</h3>
          </div>
          <div>
            <p v-if="biodata">{{ biodata.role.toUpperCase }}</p>
          </div>
        </div>
        <div class="biodatas">
          <div class="biodata">
            <i
              class="bi-alarm"
              style="font-size: 2rem; color: cornflowerblue"
            ></i>
            <h5>Status</h5>
          </div>
          <div class="biodata">
            <h5>NIM</h5>
            <h5>{{ biodata.identity }}</h5>
          </div>
          <div class="biodata">
            <h5>Email</h5>
            <h5>{{ biodata.username }}</h5>
          </div>
          <div class="biodata">
            <h5>Kontak</h5>
            <h5>{{ biodata.no_hp_users }}</h5>
          </div>
          <div class="biodata">
            <h5>Data</h5>
            <h5></h5>
          </div>
        </div>
        <div class="options">
          <h2>Ubah</h2>
          <h5></h5>
          <img src="https://picsum.photos/50/50" alt="" />
        </div>
      </div>
      <div class="tools">
        <div class="status">
          <h2>Status</h2>
        </div>
        <div class="tool">
          <div class="card">
            <img src="" alt="" />
            <div class="tool-info">Information</div>
          </div>
        </div>
        <div class="tool">
          <div class="card">
            <img src="" alt="" />
            <div class="tool-info">Information</div>
          </div>
        </div>
        <div class="tool">
          <div class="card">
            <img src="" alt="" />
            <div class="tool-info">Information</div>
          </div>
        </div>
      </div>
    </section>

    <div class="row mt-3 mb-3">
      <div class="col-md-12">
        <div class="divider">
          <h3>Aplikasi & Layanan</h3>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-md-3 col-sm-4 mb-3">
        <div class="card app"></div>
      </div>
      <div class="col-md-3 col-sm-4 mb-3">
        <div class="card app"></div>
      </div> -->
      <div
        v-for="item in client"
        :key="item.client_id"
        class="col-md-3 col-sm-4 mb-3"
      >
        <div class="card app" @click="go(item)">
          <div>{{ item.nama_client.toUpperCase() }}</div>
        </div>
      </div>
      <!-- <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div> -->
    </div>
  </div>
  <div
    v-if="popup != ''"
    class="modal fade"
    id="modal-popup"
    tabindex="-1"
    aria-labelledby="modal-popupLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ popup[0].judul_pop_up }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ popup.text_pop_up }}
        </div>
        <div class="modal-footer">
          <center>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </center>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bootstrap from "bootstrap/dist/js/bootstrap.js";
export default {
  data() {
    return {
      userData: "",
      biodata: "",
      client: "",
      popup: [],
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    async getDatas() {
      let vm = this;

      try {
        let user = await vm.$axios.get(
          "users/detailsById/" + localStorage.getItem("SSO_client_id")
        );
        vm.biodata = user.data.data[0];

        let client = await vm.$axios.get("client/list");

        vm.client = client.data.data;

        let popup = await vm.$axios.get("pop_up/list");

        vm.popup = popup.data.data;
        if (popup.data.data) {
          let x = new bootstrap.Modal(
            document.getElementById("modal-popup"),
            {}
          );
          x.show();
        }
      } catch (error) {
        console.log(error.response.data.message)
        this.$router.push({ path: "/" });
        if (error.response.data.status == 401) {
          console.log('sesi telah usai silahkan login ulang')
          this.$router.push({ path: "/" });
        }
      }
    },
    go(x) {
      console.log(x);
      window.open(x.redirect_uri);
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
  /* background-color: red; */
  /* color: aqua; */
}

.title {
  margin: 0 auto;
  width: 100%;
  max-width: 40rem;
  font-size: 4rem;
  text-align: center;
}

.glass {
  width: 100%;
  padding: 1rem 0.5rem;

  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: rgba(225, 225, 225, 0.1);

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
  display: flex;
}

.glass:hover {
  width: 100%;
  padding: 1rem 0.5rem;

  border-radius: 1rem;
  border: 1px solid transparent;
  color: black;
  background-color: linear-gradient(
    to right bottom,
    rgba(225, 225, 225, 0.5),
    rgba(225, 225, 225, 0.1)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

.dashboard {
  flex: 1;
  min-height: 50vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 2rem;
}
.user {
  margin: 3rem;
}
.tools {
  flex: 2;
  min-height: 60vh;
}

.tool {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 5rem;
  /* background-color: red; */
}

.biodata {
  display: flex;
  margin: 0.5rem 0rem;
  padding: 0.5rem 3rem;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */
}

.card {
  display: flex;
  background: linear-gradient(
    to left top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.8)
  );
  box-shadow: 6px 6px 20px rgba(255, 255, 255, 0.3);
}
.biodata h2 {
  padding: 0rem 2rem;
}

.options {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.3)
  );
  color: black;
  padding: 1rem;
}

.divider {
  width: 100%;
  /* max-width: 400px; */
  padding: 1rem 0.5rem;
  max-height: 60px;

  border-radius: 1rem;
  border: 1px solid transparent;
  background-color: rgba(225, 225, 225, 0.5);

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}

.card.app {
  /* color: aqua; */
  font-size: 35px;
  height: 100px;
  letter-spacing: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 1rem;
  border: 1px solid transparent;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.3)
  );

  backdrop-filter: blur(1rem);
  box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);

  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
}
</style>
