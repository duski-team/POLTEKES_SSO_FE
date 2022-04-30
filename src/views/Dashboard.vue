<template>
  <div><Header /></div>
  <div class="container-fluid">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Welcome!</strong> Nama Mahasiswa/Siswi
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
          <h3>Nama Mahasiswa</h3>
          <p>Mahasiswa</p>
        </div>
        <div class="biodatas">
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>Status</h4>
          </div>
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>NIM</h4>
          </div>
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>Email Poltekes</h4>
          </div>
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>Email User</h4>
          </div>
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>Kontak</h4>
          </div>
          <div class="biodata">
            <img src="https://picsum.photos/25/25" alt="" />
            <h4>Data</h4>
          </div>
        </div>
        <div class="options">
          <h2>Ubah</h2>
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
      <div class="col-md-3 col-sm-4 mb-3">
        <div class="card app"></div>
      </div>
      <div class="col-md-3 col-sm-4 mb-3">
        <div class="card app"></div>
      </div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
      <div class="col-md-3 col-sm-4 mb-3"><div class="card app"></div></div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
export default {
  components: {
    Header,
  },
  setup() {},
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
</style>
