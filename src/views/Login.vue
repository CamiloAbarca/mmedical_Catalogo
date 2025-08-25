<template>
    <div class="login d-flex justify-content-center align-items-center vh-100">
        <div class="card login-card shadow-lg">
            <div class="card-body">
                <h1 class="card-title text-center">Acceso</h1>
                <form @submit.prevent="submit">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" id="email" class="form-control" v-model="form.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password:</label>
                        <input type="password" id="password" class="form-control" v-model="form.password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                    <div v-if="error" class="mt-3 text-danger text-center">{{ error }}</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            error: null,
        };
    },
    methods: {
        async submit() {
            this.error = null;
            try {
                await this.$store.dispatch('login', this.form);
                this.$router.push('/dashboard');
            } catch (e) {
                this.error = e.message;
            }
        },
    },
};
</script>

<style scoped>
.login-card {
    border: none;
    border-radius: 1rem;
    padding: 1.5rem;
    background: #fefefe;
}

.login-card .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.shadow-lg {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.vh-100 {
    min-height: 100vh;
}
</style>