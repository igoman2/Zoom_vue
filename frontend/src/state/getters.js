export default {
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getErrorState: (state) => state.errorState,
  isNameSaved(state) {
    return !!state.user.first_name;
  },
  isLoggedIn(state) {
    return !!state.user;
  },
  getLocale(state) {
    return !!state.locale;
  },
};
