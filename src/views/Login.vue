<template>
    <b-container class="mt-5">
        <b-row align-h="center">
            <b-col cols="12" md="6">
                <b-card title="Iniciar Sesión" class="shadow-sm">
                    <b-form @submit.prevent="handleLogin">
                        <b-form-group label="Usuario:" label-for="username-input">
                            <b-form-input id="username-input" v-model="username" required></b-form-input>
                        </b-form-group>

                        <b-form-group label="Contraseña:" label-for="password-input">
                            <b-form-input id="password-input" type="password" v-model="password"
                                required></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="primary" block style="margin-top: 3%;">Acceder</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            const success = await this.$store.dispatch('login', { user: this.username, pass: this.password });
            if (success) {
                this.$router.push('/dashboard');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    }
};
</script>