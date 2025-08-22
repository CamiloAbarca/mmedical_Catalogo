import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    equipos: [
      {
        id: 1,
        tipo: "Humano",
        img: "https://via.placeholder.com/150",
        titulo: "Equipo 1",
        detalle: "Detalle del equipo 1.",
        pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        id: 2,
        tipo: "Veterinario",
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
      // Asigna un nuevo ID si no existe (para nuevos equipos)
      if (!equipo.id) {
        const newId =
          state.equipos.length > 0
            ? Math.max(...state.equipos.map((e) => e.id)) + 1
            : 1;
        equipo.id = newId;
      }
      const existingIndex = state.equipos.findIndex((e) => e.id === equipo.id);
      if (existingIndex !== -1) {
        // Reemplazar equipo existente
        Vue.set(state.equipos, existingIndex, equipo);
      } else {
        // Agregar nuevo equipo
        state.equipos.push(equipo);
      }
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
    saveEquipo({ commit }, equipo) {
      commit("addEquipo", equipo);
    },
  },
});
