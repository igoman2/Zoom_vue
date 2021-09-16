import axios from "axios";
import * as types from "./mutation_types";

export default {
  [types.USER](state, user) {
    state.user = user;
    saveState("auth.user", user, state.keep);
  },
  [types.TOKEN](state, token) {
    state.token = token;
    saveState("auth.token", token, state.keep);
    setDefaultAuthHeaders(state);
  },
  [types.ERROR_STATE](state, errorState) {
    state.errorState = errorState;
  },
  SET_KEEP_SIGNED(state, keep) {
    state.keep = keep;
    window.localStorage.setItem("auth.keep", JSON.stringify(keep));
  },
  SET_SIDEBAR_DRAWER(state, payload) {
    state.Sidebar_drawer = payload;
  },
  SET_SIDEBAR_COLOR(state, payload) {
    state.SidebarColor = payload;
  },
  SET_LOCALE(state, locale) {
    state.locale = locale;
    console.log("sessionStorage setLocale :" + JSON.stringify(locale));
    window.localStorage.setItem("auth.locale", JSON.stringify(locale));
  },
};

function saveState(key, state, keep) {
  console.log("saveState: " + keep);
  if (keep) {
    console.log("localStorage");
    window.localStorage.setItem(key, JSON.stringify(state));
  } else {
    console.log("sessionStorage");
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.token;
}
