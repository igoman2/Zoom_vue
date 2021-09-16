import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language_list: [
      "ar",
      "de",
      "en",
      "fr",
      "hi",
      "id",
      "it",
      "ja",
      "km",
      "ko",
      "mn",
      "ms",
      "ne",
      "nl",
      "pa",
      "pl",
      "pt",
      "ru",
      "sn",
      "st",
      "th",
      "tl",
      "tr",
      "ur",
      "uz",
      "vi",
      "zh",
    ],
    language: "language",
    lessonNumber: "number",
    menu: "first",
  },
  mutations: {
    chageLanguage(state, newLan) {
      state.language = newLan;
    },
    changeLessonNumber(state, newLessonNumber) {
      state.lessonNumber = newLessonNumber;
    },
    changeMenu(state, newMenu) {
      console.log("asdsad");
      state.menu = newMenu;
    },
  },
  actions: {
    languageMutation({ commit }, { newLan }) {
      commit("chageLanguage", newLan);
    },
    lessonNumberMutation({ commit }, { newLessonNumber }) {
      commit("changeLessonNumber", newLessonNumber);
    },
    menuMutation({ commit }, { newMenu }) {
      commit("changeMenu", newMenu);
    },
  },
  getters: {
    getLanguageList(state) {
      return state.language_list;
    },
    getLanguage(state) {
      return state.language;
    },
    getLessonNumber(state) {
      return state.lessonNumber;
    },
    getMenu(state) {
      return state.menu;
    },
  },
});
