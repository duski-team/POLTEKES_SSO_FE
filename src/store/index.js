import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const state = {
  sso_access_token: null,
  sso_refresh_token: null,
  expired: null,
  sso_user_id: null,
  sso_client_id: null,
  sso_username: null,
  sso_user_status: null,
  username: null,
  loading: false,
  alert: false,
};

const mutations = {
  set_login_token(state, tokens) {
    // console.log(tokens, 'set store login')
    state.sso_access_token = tokens.accessToken;
    state.sso_refresh_token = tokens.refreshToken;
    state.sso_client_id = tokens.client.id;
    state.sso_user_id = tokens.user.id;
    state.expired = tokens.accessTokenExpiresAt;
    state.username = tokens.user.username;
    state.sso_user_status = tokens.user.user_status;
  },
  set_intercept_token(state, tokens) {
    // console.log(tokens)
    state.sso_access_token = tokens.accessToken;
    state.sso_refresh_token = tokens.refreshToken;
    state.sso_client_id = tokens.client.id;
    state.sso_user_id = tokens.user.id;
    state.expired = tokens.accessTokenExpiresAt;
    state.username = tokens.user.username;
  },
  set_clear_token(state) {
    state.sso_access_token = null;
    state.sso_refresh_token = null;
    state.sso_client_id = null;
    state.sso_user_id = null;
    state.expired = null;
    state.username = null;
    state.sso_user_status = null;
  },
  set_loading_state(state, value) {
    state.loading = value;
  },
};
const actions = {
  save_token_login({ commit }, log_respon) {
    // console.log(log_respon,'store login')
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
};
const modules = {};
const plugins = [createPersistedState()];
export default new createStore({
  state,
  mutations,
  actions,
  modules,
  plugins,
});
