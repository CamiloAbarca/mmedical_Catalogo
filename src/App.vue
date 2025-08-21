<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="light" class="shadow-sm border-bottom">
      <b-container>
        <b-navbar-brand href="#" class="text-dark font-weight-bold">Gestión de Equipos</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="$store.state.isAuthenticated" @click="logout" class="text-secondary">Cerrar
              Sesión</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <router-view class="main-content-area py-5" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    /**
     * Maneja el cierre de sesión del usuario.
     * Despacha la acción 'logout' de Vuex y redirige al usuario a la página de inicio de sesión.
     */
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style>
/* Importar una fuente limpia, por ejemplo, Inter desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
  /* Un fondo muy claro */
  color: #343a40;
  /* Color de texto oscuro pero suave */
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.main-content-area {
  max-width: 1200px;
  /* Limitar el ancho máximo del contenido */
  margin: 0 auto;
  /* Centrar el contenido */
  padding-left: 15px;
  padding-right: 15px;
}

/* Estilos de la barra de navegación para un aspecto minimalista */
.navbar {
  background-color: #ffffff !important;
  /* Blanco puro para la navbar */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  /* Borde sutil */
}

.navbar-brand,
.nav-link {
  color: #495057 !important;
  /* Texto oscuro y legible */
  font-weight: 500;
  /* Peso de fuente medio */
}

.navbar-brand:hover,
.nav-link:hover {
  color: #007bff !important;
  /* Un toque de color al pasar el ratón */
}

/* Redondear esquinas en todos los elementos principales */
.card,
.modal-content,
.btn,
.form-control,
.b-table {
  border-radius: 0.75rem;
  /* Esquinas más redondeadas */
}

/* Sombra suave para los elementos de UI */
.shadow-sm {
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
}
</style>