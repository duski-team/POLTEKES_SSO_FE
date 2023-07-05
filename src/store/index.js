import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import ip from "@/ip.js";
// import Cookies from "vue-cookies"

const state = {
  sso_access_token: null,
  sso_refresh_token: null,
  expired: null,
  refresh_expired: null,
  sso_user_id: null,
  sso_client_id: null,
  sso_username: null,
  sso_user_status: null,
  sso_user_role: "",
  username: null,
  kode_otp: null,
  loading: false,
  alert: "",
  show: false,
  backColor: "",
  biodata: null,
  profil: null,
  popup: true,
  app: null,
  bsi_client_id: "2576",
  bni_client_id: "29873",
  bni_prefix: "988",
  btn_prefix: "95673000000",
  mandiri_client_id: "88976",
  payment: null,
  semester: null,
  tahun: null,
  herreg: null,
  cuti: null,
};

const mutations = {
  set_login_token(state, tokens) {
    // console.log(tokens, "set store login");
    state.sso_access_token = tokens.accessToken;
    state.sso_refresh_token = tokens.refreshToken;
    state.sso_client_id = tokens.client.id;
    state.sso_user_id = tokens.user.id;
    state.expired = tokens.accessTokenExpiresAt;
    state.refresh_expired = tokens.refreshTokenExpiresAt;
    state.sso_username = tokens.user.username;
    state.sso_user_status = tokens.user.user_status;
    state.sso_user_role = tokens.user.role;
  },
  set_intercept_token(state, tokens) {
    // console.log(tokens)
    state.sso_access_token = tokens.accessToken;
    state.sso_refresh_token = tokens.refreshToken;
    state.sso_client_id = tokens.client.id;
    state.sso_user_id = tokens.user.id;
    state.expired = tokens.accessTokenExpiresAt;
    state.sso_username = tokens.user.username;
  },
  set_clean(state) {
    state.payment = null;
    state.semester = null;
    state.tahun = null;
    state.herreg = null;
    state.cuti = null;
  },
  set_clear_token(state) {
    // console.log("set_clear");
    state.sso_access_token = null;
    state.sso_refresh_token = null;
    state.sso_client_id = null;
    state.sso_user_id = null;
    state.expired = null;
    state.sso_username = null;
    state.sso_user_status = null;
    state.username = null;
    state.kode_otp = null;
    state.biodata = null;
    state.profil = null;
    state.popup = true;
    state.sso_user_role = null;
    state.payment = null;
    state.app = null;
    (state.herreg = null),
      (state.cuti = null),
      (state.semester = null),
      (state.tahun = null);
  },
  set_loading_state(state, value) {
    state.loading = value;
  },
  set_username_lupa(state, value) {
    state.username = value;
  },
  set_kode_otp_lupa(state, value) {
    state.kode_otp = value;
  },
  set_payment(state, value) {
    state.payment = null;
    state.payment = value;
  },
  set_data_biodata(state, value) {
    // console.log(value, "biodata");
    if (value.role == "mahasiswa") {
      value.foto = `https://simadu.poltekkes-smg.ac.id/foto/${value.identity}`;
    }
    state.biodata = value;
  },
  set_data_profil(state, value) {
    // console.log(value, "profil");
    if (state.sso_user_role == "dosen" || state.sso_user_role == "pegawai") {
      state.biodata.foto = `http://simpeg.poltekkes-smg.ac.id/packages/upload/photo/pegawai/${value.photo}`;
      state.biodata.nama_lengkap_users = value.nama;
    } else if (state.sso_user_role == "mahasiswa") {
      state.biodata.nama_lengkap_users = value.f_namamahasiswa;
    } else if (state.sso_user_role == "admin") {
      value = { photo: "" };
      state.biodata.nama_lengkap_users = "admin";
      state.biodata.foto = "http://placekitten.com/700/500";
    }
    state.profil = value;
    // console.log(state.profil, "iki");
  },
  show_alert_success(state, value) {
    state.alert = value.toUpperCase();
    state.backColor = "background-color: #91f086";
    state.show = true;
  },
  show_alert_fail(state, value) {
    state.alert = value.toUpperCase();
    state.backColor = "background-color: #FF6962";
    state.show = true;
  },
  hide_alert(state) {
    state.alert = "";
    state.show = false;
  },
  popup(state, value) {
    state.popup = value;
  },
  data_app(state, value) {
    // console.log(value, "app");
    value.map((item) => {
      item.src1 = ip + "/" + item.logo_client;
    });
    state.app = value;
    // console.log(state.app, "appp");
  },
  biodata_foto(state, value) {
    state.biodata.foto = value;
  },
  set_semester(state, value) {
    console.log(value);
    state.semester = value;
  },
  set_tahun(state, value) {
    console.log(value);
    state.tahun = value;
  },
  set_herreg(state, value) {
    state.herreg = null;
    state.herreg = value;
  },
  set_cuti(state, value) {
    state.cuti = null;
    state.cuti = value;
  },
};
const actions = {
  save_token_login({ commit }, log_respon) {
    console.log(log_respon,'store login')
    commit("set_login_token", log_respon);
  },
  save_token_intercept({ commit }, int_respon) {
    commit("set_intercept_token", int_respon);
  },
  clear_token({ commit }) {
    commit("set_clear_token");
  },
  set_loading({ commit }, value) {
    commit("set_loading_state", value);
  },
  set_username({ commit }, value) {
    commit("set_username_lupa", value);
  },
  set_otp({ commit }, value) {
    commit("set_kode_otp_lupa", value);
  },
  set_biodata({ commit }, value) {
    commit("set_data_biodata", value);
  },
  set_profil({ commit }, value) {
    commit("set_data_profil", value);
  },
  set_alert_show_success({ commit }, value) {
    commit("show_alert_success", value);
  },
  set_alert_show_fail({ commit }, value) {
    commit("show_alert_fail", value);
  },
  set_alert_hide({ commit }) {
    commit("hide_alert");
  },
  set_popup({ commit }, value) {
    commit("popup", value);
  },
  set_app({ commit }, value) {
    commit("data_app", value);
  },
  set_foto({ commit }, value) {
    commit("biodata_foto", value);
  },
  payment({ commit }, value) {
    // console.log(value);
    if (value) {
      let x = value.tahun_kb.includes("-1");
      let v = value.tahun_kb.substring(0, 4);
      if (x) {
        value.semester = v + " Ganjil";
      } else {
        value.semester = v + " Genap";
      }
      commit("set_payment", value);
    }
  },
};
const modules = {};
// const plugins = [createPersistedState({
//   storage: {
//     getItem: key => Cookies.get(key),
//     setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
//     removeItem: key => Cookies.remove(key)
//   }
// })];
const plugins = [
  createPersistedState({
    key: "SSO",
  }),
];
export default new createStore({
  state,
  mutations,
  actions,
  modules,
  plugins,
});
