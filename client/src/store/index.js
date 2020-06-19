// import Vue from "vue";
// import Vuex from "vuex";
// import axios from "axios";
// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     status: "",
//     token: localStorage.getItem("token") || "",
//     user: {}
//   },
//   mutations: {
//     auth_request(state) {
//       state.status = "loading";
//     },
//     auth_success(state, token, user) {
//       state.status = "success";
//       state.token = token;
//       state.user = user;
//     },
//     auth_error(state) {
//       state.status = "error";
//     },
//     logout(state) {
//       state.status = "";
//       state.token = "";
//     }
//   },
//   getters: {
//     isLoggedIn: state => !!state.token,
//     authStatus: state => state.status
//   },
//   actions: {
//     logout({ commit }) {
//       return new Promise((resolve, reject) => {
//         commit("logout");
//         localStorage.removeItem("token");
//         delete axios.defaults.headers.common["Authorization"];
//         resolve();
//         reject();
//       });
//     }
//   }
// });
