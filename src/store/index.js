// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    equipos: [],
    status: "",
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setError(state, error) {
      state.error = error;
    },
    setEquipos(state, equipos) {
      state.equipos = equipos;
    },
    addEquipo(state, equipo) {
      state.equipos.push(equipo);
    },
    updateEquipo(state, updatedEquipo) {
      const index = state.equipos.findIndex((e) => e.id === updatedEquipo.id);
      if (index !== -1) Vue.set(state.equipos, index, updatedEquipo);
    },
    removeEquipo(state, id) {
      state.equipos = state.equipos.filter((e) => e.id !== id);
    },
    setAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
  },

  actions: {
    async login({ commit }, credenciales) {
      try {
        const response = await fetch(
          "https://mmedical.cl/apiCatalogo/usuarios/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credenciales),
          }
        );

        if (!response.ok) throw new Error("Credenciales inválidas");

        const data = await response.json();

        localStorage.setItem("token", data.token);

        commit("setStatus", "authenticated");
        commit("setError", null);
        commit("setAuthenticated", true);

        return true;
      } catch (error) {
        commit("setStatus", "error");
        commit("setError", error.message);
        commit("setAuthenticated", false);
        return false;
      }
    },

    logout({ commit }) {
      localStorage.removeItem("token");
      commit("setAuthenticated", false);
      commit("setEquipos", []);
    },

    async fetchEquipos({ commit }) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://mmedical.cl/apiCatalogo/equipos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener los equipos");

        const data = await response.json();
        commit("setEquipos", data);
      } catch (error) {
        commit("setError", error.message);
      }
    },

    async saveEquipo({ commit }, equipoData) {
      try {
        const token = localStorage.getItem("token");
        let url = "https://mmedical.cl/apiCatalogo/equipos";
        let method = "POST";

        if (equipoData.id) {
          url = `${url}/${equipoData.id}`;
          method = "PUT";
        }

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(equipoData),
        });

        if (!response.ok) throw new Error("Error al guardar el equipo");

        const data = await response.json();

        if (method === "POST") {
          commit("addEquipo", data);
        } else {
          commit("updateEquipo", data);
        }

        return data; // <- importante: devolvemos el equipo guardado
      } catch (error) {
        commit("setError", error.message);
        throw error;
      }
    },
  },
});
