<template>
    <b-container class="mt-5">
        <b-row align-h="center">
            <b-col cols="12" md="6" lg="4">
                <b-card class="shadow-sm p-4">
                    <!-- Logo circular -->
                    <div class="login-logo mb-3">
                        <b-icon-person-fill font-scale="3" class="text-white"></b-icon-person-fill>
                    </div>

                    <h2 class="h4 text-center mb-4">Iniciar Sesión</h2>

                    <b-alert v-if="error" variant="danger" show>{{ error }}</b-alert>

                    <b-form @submit.prevent="handleLogin">
                        <b-form-group label="Correo" label-for="email">
                            <b-form-input id="email" v-model="email" type="email" required
                                placeholder="Ingresa tu correo"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Contraseña" label-for="password">
                            <b-form-input id="password" v-model="password" type="password" required
                                placeholder="Ingresa tu contraseña"></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block :disabled="loading" class="mt-3 btn-login">
                            <b-spinner small variant="light" v-if="loading"
                                class="spinner-inside mr-2"></b-spinner>
                            Ingresar
                        </b-button>

                    </b-form>


                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            email: "",
            password: "",
            loading: false,
        };
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
    },
    methods: {
        async handleLogin() {
            this.loading = true;
            const success = await this.$store.dispatch("login", {
                email: this.email,
                password: this.password,
            });
            this.loading = false;

            if (success) {
                this.$router.push("/dashboard");
            }
        },
    },
};
</script>

<style scoped>
/* Fondo degradado */
.b-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

/* Tarjeta del login */
b-card {
    border-radius: 1.25rem;
    background: #fff;
    border: none;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    padding-top: 3rem;
    /* espacio para el logo */
}

/* Logo circular */
.login-logo {
    width: 80px;
    height: 80px;
    background: #2575fc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto -2rem auto;
    /* se superpone un poco sobre la tarjeta */
    box-shadow: 0 6px 15px rgba(37, 117, 252, 0.3);
}

/* Título */
h2 {
    font-weight: bold;
    color: #343a40;
    font-size: 1.6rem;
}

/* Inputs */
.form-control {
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #2575fc;
    box-shadow: 0 0 0 0.25rem rgba(37, 117, 252, 0.25);
}

/* Botón */
.btn-primary {
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem;
    background: linear-gradient(90deg, #2575fc, #6a11cb);
    border: none;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(37, 117, 252, 0.3);
}

/* Alert */
.alert {
    border-radius: 0.75rem;
    font-size: 0.9rem;
}

.b-spinner {
    vertical-align: middle;
}

/* Botón login personalizado */
.btn-login {
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.75rem;
    background: linear-gradient(90deg, #2575fc, #6a11cb);
    border: none;
    transition: all 0.3s ease;
    /* eliminar flex para no expandir el spinner */
    text-align: center;
}

/* Estado hover */
.btn-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(37, 117, 252, 0.3);
}

/* Estado deshabilitado */
.btn-login:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Spinner dentro del botón */
.spinner-inside {
    width: 1rem;
    /* tamaño fijo pequeño */
    height: 1rem;
    /* igual al ancho */
    vertical-align: middle;
}
</style>
