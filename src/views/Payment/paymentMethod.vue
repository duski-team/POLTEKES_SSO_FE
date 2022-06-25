<template>
  <div class="container-fluid">
    <div class="card" v-if="open">
      <div class="card-header">
        <h5 class="card-title">PILIH METODE PEMBAYARAN</h5>
      </div>
      <div class="card-body">
        <div class="transfer">
          <div v-if="show != 1" @click="show = 1">
            <font-awesome-icon
              icon="fa-solid fa-arrow-left"
              size="2x"
              style="padding-left: 1.5rem"
            />
          </div>
          <div v-else><h5 class="transfer-title">TRANSFER BANK</h5></div>
        </div>
        <div v-if="show == 1">
          <div class="box-bank" @click="(show = 2), (bank = 'BNI')">
            <img src="@/assets/BNILOGO.png" alt="" class="img-bank" />
          </div>
          <div class="box-bank" @click="(show = 2), (bank = 'BTN')">
            <img src="@/assets/BTNLOGO.png" alt="" class="img-bank" />
          </div>
          <div class="box-bank" @click="(show = 2), (bank = 'BSI')">
            <img src="@/assets/BSILOGO.png" alt="" class="img-bank" />
          </div>
        </div>
        <div class="cara" v-if="show == 2 && bank == 'BNI'">
          <BNI :tagihan="tagihan" />
        </div>
        <div class="cara" v-if="show == 2 && bank == 'BSI'">
          <BSI :tagihan="tagihan" />
        </div>
        <div class="cara" v-if="show == 2 && bank == 'BTN'">
          <BTN :tagihan="tagihan" />
        </div>
      </div>

      <div class="card-footer">
        <div>
            <button
              type="button"
              class="btn btn-secondary"
              @click="$emit('close'),show = 1, bank=''"
            >
              Kembali
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BNI from "./BNI.vue";
import BSI from "./BSI.vue";
import BTN from "./BTN.vue";
export default {
  components: { BNI, BSI, BTN },
  props: ["open",'tagihan'],
  data() {
    return {
      popup: "",
      show: 1,
      status: true,
      bank: "",
      cara: false,
      caraATM: false,
      caraIB: false,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.container-fluid{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80%;
}
.card {
  padding: 3rem 1.75rem;
  position: absolute;
  width: 540px;
  /* left: calc((100% - 540px) / 2); */
  /* min-height: 80%; */
  backdrop-filter: blur(0.09rem);
  z-index: 10;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
}

.transfer {
  display: flex;
  align-content: center;
  height: 50px;
  margin-bottom: 20px;
}

.transfer-title {
  font-weight: 200;
  text-align: start;
  margin-left: 20px;
}

.box-bank {
  height: 110px;
  width: 95%;
  border-radius: 1rem;
  border: 1px solid #667085;
  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
  /* background-color: rgba(225, 225, 225, 0.1); */
  box-shadow: 1rem 1rem 1rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 10px;
  color: #667085;
  margin-bottom: 20px;
  cursor: pointer;
}
.box-bank:hover {
  transform: scale(1.05);
  height: 110px;
  width: 95%;
  border-radius: 1rem;
  border: 1px solid #667085;
  border-top-color: rgba(225, 225, 225, 0.5);
  border-left-color: rgba(225, 225, 225, 0.5);
  border-bottom-color: rgba(225, 225, 225, 0.1);
  border-right-color: rgba(225, 225, 225, 0.1);
  /* background-color: rgba(225, 225, 225, 0.1); */
  box-shadow: 1rem 1rem 1rem 1rem rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  padding: 10px;
  color: #667085;
  margin-bottom: 20px;
}

.img-bank {
  height: 100%;
  width: 90%;
  margin-bottom: 5px;
  align-items: flex-start;
}
</style>
