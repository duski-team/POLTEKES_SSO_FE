<template>
  <div><Header /></div>
  <div class="container">
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Welcome!</strong> Nama Mahasiswa/Siswi
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>

    <!-- <div class="row mt-3 mb-3">
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
    </div> -->
  </div>
  <div class="container">
    <section class="glass">
      <div class="dashboard">
        <div class="user">
          <div>
            <img class="foto" src="https://picsum.photos/100/100" alt="" />
          </div>
          <div class="nama">
            <p>Nama Mahasiswa</p>
          </div>
          <div class="role">
            <p>Role</p>
            <p>|</p>
            <p>NIM</p>
          </div>
          <div>
            <div type="button" class="btn btn-lihat">
              Lihat Selengkapnya
            </div>
          </div>
        </div>
      </div>
      <div class="tools">
        <!-- <div class="tool">
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
        </div> -->
      </div>
    </section>
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
  justify-content: space-between;
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
  width: 280px;
  height: 349px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  background-color: #ffffff;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  /* Shadow/sm */

  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}

.user {
  /* margin: 3rem; */
  display: flex;
  flex-direction: column;

}

.nama {
  display: flex;
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}

.role {
  display: flex;
  justify-content: center;
  font-size: 15px;
  line-height: 24px;

}

.btn-lihat{
  background-color: #027A48;
  color: #ffffff;
}

.tools {
  width: 906px;
  height: 349pxF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  width: 906px;
  height: 349px;
  left: 422px;
  top: 163px;

  /* White */

  background: #ffffff;
  /* Gray/200 */

  border: 1px solid #eaecf0;
  box-sizing: border-box;
  /* Shadow/sm */

  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
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

/* .options {
} */

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
