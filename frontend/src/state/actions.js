import { USER, TOKEN, ERROR_STATE } from "./mutation_types";
import axios from "axios";
import { signin, signup, getMyInfo, updateMyInfo } from "@/service/user";
import i18n from "../i18n";

let setUser = ({ commit }, data) => {
  commit(USER, data);
};

let setToken = ({ commit }, data) => {
  commit(TOKEN, data);
};

let setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data);
};

let processResponse = async (store, loginResponse) => {
  if (loginResponse.status != 200) {
    setErrorState(store, "Wrong ID or Password");
  } else {
    console.log("loginResponse.token: " + loginResponse.data.token);
    setToken(store, loginResponse.data.token);

    axios.defaults.headers.common["Authorization"] =
      "token " + loginResponse.data.token;
    let myResponse = await getMyInfo();

    console.log("myResponse.data: " + myResponse.data);
    setUser(store, myResponse.data);
    setErrorState(store, "");
  }
};

export const state = {
  user: getSavedState("auth.user"),
  token: getSavedState("auth.token"),
  keep: getKeepState(),
  locale: getLocaleState(),

  Sidebar_drawer: null,
  SidebarColor: "white",
};

export default {
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch("validate");
  },

  async login(store, { email, password, keepSigned }) {
    store.commit("SET_KEEP_SIGNED", keepSigned);

    let loginResponse = await signin(email, password);
    await processResponse(store, loginResponse);
    return loginResponse;
  },

  async register(store, { email, password }) {
    const loginResponse = await signup(email, password);
    await processResponse(store, loginResponse);

    return loginResponse;
  },

  async updateUser(store, user) {
    const updateResponse = await updateMyInfo(user);
    // console.log('updateResponse', updateResponse)
    if (updateResponse.status == 200) {
      // console.log('Current user INFO:' + JSON.stringify(user))
      console.log("update i18n :" + i18n.locale);
      store.commit("SET_LOCALE", i18n.locale);

      let myResponse = await getMyInfo();
      if (myResponse.status == 200) {
        // console.log('myResponse user INFO:'+ JSON.stringify(myResponse.data))
        setUser(store, myResponse.data);
      }
    }
  },
  setLocale(store) {
    console.log("update i18n :" + i18n.locale);
    store.commit("SET_LOCALE", i18n.locale);
  },

  async socialLogin(store, response) {
    await processResponse(store, response);
    return response;
  },

  // Logs out the current user.
  logout({ commit }) {
    commit(USER, null);
    commit(TOKEN, null);
    axios.defaults.headers.common["Authorization"] = null;
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  async validate(store) {
    if (!store.state.user) {
      console.log("!state.user");
      return Promise.resolve(null);
    }

    try {
      const response = await getMyInfo();
      console.log("####validate response:" + JSON.stringify(response));
      const user = response.data;
      setUser(store, user);
      return user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUser(store, null);
      }
      return null;
    }
  },
};

function getSavedState(key) {
  console.log("getSavedState.keep" + getKeepState());
  try {
    if (getKeepState()) {
      console.log("get localStorage");

      console.log(
        "get state: " + JSON.stringify(window.localStorage.getItem(key))
      );

      return JSON.parse(window.localStorage.getItem(key));
    } else {
      console.log("get sessionStorage");
      console.log(
        "get state: " + JSON.stringify(window.sessionStorage.getItem(key))
      );

      return JSON.parse(window.sessionStorage.getItem(key));
    }
  } catch (error) {
    return null;
  }
}
function getKeepState() {
  return JSON.parse(window.localStorage.getItem("auth.keep"));
}
function getLocaleState() {
  return JSON.parse(window.localStorage.getItem("auth.locale"));
}
function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.token;
}
