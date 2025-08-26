<template>
    <b-form @submit.prevent="submitForm" class="p-4 form-elegant">
        <b-form-group label="Tipo de Equipo:" label-for="input-tipo" class="mb-4">
            <b-form-select id="input-tipo" v-model="form.tipo" :options="tipos" required
                class="form-control-elegant"></b-form-select>
        </b-form-group>

        <b-form-group label="Título del Equipo:" label-for="input-titulo" class="mb-4">
            <b-form-input id="input-titulo" v-model="form.titulo" placeholder="Ingrese el título" required
                class="form-control-elegant"></b-form-input>
        </b-form-group>

        <b-form-group label="Detalle del Equipo:" label-for="input-detalle" class="mb-4">
            <b-form-textarea id="input-detalle" v-model="form.detalle" placeholder="Ingrese el detalle" rows="3"
                max-rows="6" required class="form-control-elegant"></b-form-textarea>
        </b-form-group>

        <b-form-group label="URL de la Imagen:" label-for="input-img" class="mb-4">
            <b-form-input id="input-img" v-model="form.img" placeholder="Ingrese la URL de la imagen"
                class="form-control-elegant"></b-form-input>
            <b-form-text class="mt-2 text-muted" v-if="equipoToEdit && equipoToEdit.img">
                URL actual: <strong>{{ equipoToEdit.img }}</strong>
            </b-form-text>
        </b-form-group>

        <b-form-group label="URL del PDF:" label-for="input-pdf" class="mb-4">
            <b-form-input id="input-pdf" v-model="form.pdf" placeholder="Ingrese la URL del PDF"
                class="form-control-elegant"></b-form-input>
            <b-form-text class="mt-2 text-muted" v-if="equipoToEdit && equipoToEdit.pdf">
                URL actual: <strong>{{ equipoToEdit.pdf }}</strong>
            </b-form-text>
        </b-form-group>

        <hr class="my-4">

        <div class="d-flex gap-3 justify-content-end">
            <b-button type="submit" variant="primary" class="mr-3 action-btn save-btn">
                <b-icon-check-circle-fill></b-icon-check-circle-fill> Guardar
            </b-button>
            <b-button type="button" variant="outline-secondary" class="action-btn cancel-btn" @click="$emit('cancel')">
                <b-icon-x-circle-fill></b-icon-x-circle-fill> Cancelar
            </b-button>
        </div>
    </b-form>
</template>

<script>
export default {
    name: 'EquipoForm',
    props: {
        equipoToEdit: { type: Object, default: null }
    },
    data() {
        return {
            form: { id: null, tipo: 'Humano', titulo: '', detalle: '', img: '', pdf: '' },
            tipos: [
                { value: 'Humano', text: 'Humano' },
                { value: 'Veterinario', text: 'Veterinario' }
            ]
        };
    },
    watch: {
        equipoToEdit: {
            handler(newVal) {
                if (newVal) {
                    this.form = { ...newVal };
                } else {
                    this.resetForm();
                }
            },
            immediate: true
        }
    },
    methods: {
        resetForm() {
            this.form = { id: null, tipo: 'Humano', titulo: '', detalle: '', img: '', pdf: '' };
        },
        submitForm() {
            // Emitimos los datos completos con los nombres correctos
            this.$emit('equipo-saved', { ...this.form });
            this.resetForm();
        }
    }
};
</script>

<style scoped>
.form-elegant {
    background-color: #fff;
}

.form-control-elegant {
    border: 1px solid #dee2e6;
    border-radius: .5rem;
    padding: .75rem 1rem;
}

.form-control-elegant:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
}

.action-btn {
    font-size: 1rem;
    padding: .6rem 1.5rem;
    border-radius: .5rem;
    transition: all 0.2s ease;
}

.save-btn {
    background-color: #28a745;
    border-color: #28a745;
}

.save-btn:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.2);
}

.cancel-btn {
    border-color: #6c757d;
    color: #6c757d;
}

.cancel-btn:hover {
    background-color: #6c757d;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(108, 117, 125, 0.2);
}
</style>
