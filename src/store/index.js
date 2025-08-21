import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    equipos: [
      {
        id: 1,
        img: "https://via.placeholder.com/150",
        titulo: "Equipo 1",
        detalle: "Detalle del equipo 1.",
        pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: 2,
        img: "https://via.placeholder.com/150",
        titulo: "Equipo 2",
        detalle: "Detalle del equipo 2.",
        pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  },
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    addEquipo(state, equipo) {
      state.equipos.push(equipo);
    },
    removeEquipo(state, equipoId) {
      state.equipos = state.equipos.filter((e) => e.id !== equipoId);
    },
  },
  actions: {
    login({ commit }, { user, pass }) {
      // Simula la autenticación
      if (user === "admin" && pass === "123") {
        commit("setAuthenticated", true);
        return true;
      }
      return false;
    },
    logout({ commit }) {
      commit("setAuthenticated", false);
    },
  },
});
