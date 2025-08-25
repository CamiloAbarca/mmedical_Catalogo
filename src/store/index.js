import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    equipos: [],
    status: "",
    error: null,
  },
  mutations: {
    /**
     * Establece el estado del usuario y la autenticación.
     * @param {object} state - El estado actual.
     * @param {object} user - El objeto de usuario con sus datos y token.
     */
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
      localStorage.setItem("token", user ? user.token : "");
    },
    /**
     * Limpia el estado del usuario al cerrar sesión.
     * @param {object} state - El estado actual.
     */
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    /**
     * Establece el estado de la petición.
     * @param {object} state - El estado actual.
     * @param {string} status - El nuevo estado ('loading', 'success', 'error').
     */
    setStatus(state, status) {
      state.status = status;
    },
    /**
     * Almacena los equipos en el estado.
     * @param {object} state - El estado actual.
     * @param {array} equipos - El array de equipos a almacenar.
     */
    setEquipos(state, equipos) {
      state.equipos = equipos;
    },
    /**
     * Agrega un nuevo equipo al estado.
     * @param {object} state - El estado actual.
     * @param {object} equipo - El nuevo equipo a agregar.
     */
    addEquipo(state, equipo) {
      state.equipos.push(equipo);
    },
    /**
     * Actualiza un equipo existente en el estado.
     * @param {object} state - El estado actual.
     * @param {object} updatedEquipo - El equipo actualizado.
     */
    updateEquipo(state, updatedEquipo) {
      const index = state.equipos.findIndex((e) => e.id === updatedEquipo.id);
      if (index !== -1) {
        Vue.set(state.equipos, index, updatedEquipo);
      }
    },
    /**
     * Elimina un equipo del estado.
     * @param {object} state - El estado actual.
     * @param {number} equipoId - El ID del equipo a eliminar.
     */
    removeEquipo(state, equipoId) {
      state.equipos = state.equipos.filter((e) => e.id !== equipoId);
    },
    /**
     * Almacena un error en el estado.
     * @param {object} state - El estado actual.
     * @param {Error} error - El objeto de error.
     */
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    /**
     * Acción para iniciar sesión.
     * @param {object} context - El contexto de Vuex.
     * @param {object} credentials - Las credenciales del usuario (email, password).
     */
    async login({ commit }, credentials) {
      commit("setStatus", "loading");
      try {
        const response = await fetch(
          "https://mmedical.cl/apiCatalogo/usuarios/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Error de autenticación");
        }

        const user = await response.json();
        commit("setUser", user);
        commit("setStatus", "success");
        return user;
      } catch (error) {
        commit("setError", error);
        commit("setStatus", "error");
        throw error;
      }
    },
    /**
     * Acción para cerrar sesión.
     * @param {object} context - El contexto de Vuex.
     */
    logout({ commit }) {
      commit("clearUser");
    },
    /**
     * Realiza una petición a la API para guardar un equipo (crear o actualizar).
     * @param {object} context - El contexto de Vuex (commit, dispatch, state).
     * @param {FormData} formData - Los datos del equipo a guardar, incluyendo archivos.
     */
    async saveEquipo({ commit }, formData) {
      commit("setStatus", "loading");
      commit("setError", null);

      const isUpdate = formData.has("id");
      const apiUrl = isUpdate
        ? `https://mmedical.cl/apiCatalogo/equipos/${formData.get("id")}`
        : "https://mmedical.cl/apiCatalogo/equipos";
      const method = isUpdate ? "PUT" : "POST";

      try {
        const response = await fetch(apiUrl, {
          method,
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al guardar el equipo en la API");
        }

        const data = await response.json();

        if (method === "POST") {
          commit("addEquipo", data);
        } else {
          commit("updateEquipo", data);
        }

        commit("setStatus", "success");
      } catch (error) {
        commit("setStatus", "error");
        commit("setError", error);
        console.error("Error en la API:", error);
      }
    },
  },
  modules: {},
});
