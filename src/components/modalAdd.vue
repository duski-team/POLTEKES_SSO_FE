<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalAddThread"
    ref="modalAddThread"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Buat Thread</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img v-if="src1" :src="src1" alt="" class="img-thumbnail" />
          <form>
            <div class="row g-3 align-items-center mb-2">
              <div class="col-3">
                <label class="col-form-label">Judul</label>
              </div>
              <div class="col-9">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="passwordHelpInline"
                  v-model="data.judul_thread"
                />
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-3">
                <label class="col-form-label">File</label>
              </div>
              <div class="col-9">
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  ref="file1"
                  @input="handleFile"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Batal
          </button>
          <button type="button" class="btn btn-primary" :disabled="isValid">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Modal } from "bootstrap";
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required} from "@vuelidate/validators";
export default {
  setup() {
    const data = reactive({
      judul_thread: "",
      file1: "",
    });

    const rules = computed(() => {
      return {
        judul_thread: {
          required,
        },
        file1: {
          required,
        },
      };
    });

    const v$ = useVuelidate(rules, data);

    return {
      v$,
      rules,
      data,
    };
  },
  data() {
    return {
      modalAdd: null,
      file1: "",
      src1:"",
    };
  },
  // computed: {
  //   isDirty() {
  //     return this.v$.$anyDirty;
  //   },
  //   isValid() {
  //     return !this.v$.$invalid;
  //   },
  //   formString() {
  //     return JSON.stringify(this.data);
  //   },
  // },
  mounted() {
    this.modalAdd = new Modal(this.$refs.modalAddThread);
    // this.getData()
    this.modalAdd.show();
  },
  methods: {
    handleFile() {
      this.file1 = this.$refs.file1.files[0]
      this.data.file1 = this.$refs.file1.files[0];
      this.src1= URL.createObjectURL(this.file1)
      console.log(this.src1);
    },
    registerThread() {
      let vm = this;
      let formData = new FormData();
      formData.append("judul_thread", vm.data.judul_thread);
      formData.append("file1", vm.data.file1);
      axios
        .post("thread/register", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>