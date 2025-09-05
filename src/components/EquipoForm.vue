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

        <b-form-group label="Imagen del Equipo:" label-for="input-img" class="mb-4">
            <b-form-file id="input-img" v-model="imgFile" accept="image/*" class="form-control-elegant"></b-form-file>
            <b-form-text class="mt-2 text-muted" v-if="equipoToEdit && equipoToEdit.img">
                Imagen actual: <strong>{{ equipoToEdit.img }}</strong>
            </b-form-text>
        </b-form-group>

        <b-form-group label="PDF del Equipo:" label-for="input-pdf" class="mb-4">
            <b-form-file id="input-pdf" v-model="pdfFile" accept="application/pdf"
                class="form-control-elegant"></b-form-file>
            <b-form-text class="mt-2 text-muted" v-if="equipoToEdit && equipoToEdit.pdf">
                PDF actual: <strong>{{ equipoToEdit.pdf }}</strong>
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
            form: { id: null, tipo: '', titulo: '', detalle: '' },
            tipos: [
                { value: '', text: 'Seleccione...' },
                { value: 'Humano', text: 'Humano' },
                { value: 'Veterinario', text: 'Veterinario' }
            ],
            imgFile: null,
            pdfFile: null
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
            this.form = { id: null, tipo: '', titulo: '', detalle: '' };
            this.imgFile = null;
            this.pdfFile = null;
        },
        async submitForm() {
            // Validar campos de texto y select antes de continuar
            if (!this.form.tipo) {
                alert('Por favor, seleccione un tipo de equipo.');
                return;
            }
            if (!this.form.titulo) {
                alert('Por favor, ingrese el título del equipo.');
                return;
            }
            if (!this.form.detalle) {
                alert('Por favor, ingrese el detalle del equipo.');
                return;
            }

            // Validar que al menos uno de los archivos sea obligatorio al crear un nuevo equipo
            const isNew = !this.form.id;
            if (isNew && !this.imgFile && !this.pdfFile) {
                alert('Debe adjuntar al menos una imagen o un PDF para crear un nuevo equipo.');
                return;
            }

            const baseUrl = 'https://mmedical.cl/apiCatalogo/equipos';
            const url = this.form.id ? `${baseUrl}/${this.form.id}` : baseUrl;
            const method = this.form.id ? 'PUT' : 'POST';

            // Comprobamos si hay archivos para determinar el tipo de envío
            const hasFiles = this.imgFile || this.pdfFile;

            try {
                let response;
                if (this.form.id && !hasFiles) { // Si es una edición SIN archivos, enviamos JSON
                    response = await fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.form)
                    });
                } else { // Si es una creación O una edición CON archivos, usamos FormData
                    const formData = new FormData();
                    formData.append('tipo', this.form.tipo);
                    formData.append('titulo', this.form.titulo);
                    formData.append('detalle', this.form.detalle);
                    if (this.imgFile) formData.append('img', this.imgFile);
                    if (this.pdfFile) formData.append('pdf', this.pdfFile);
                    if (this.form.id) formData.append('id', this.form.id);

                    response = await fetch(url, {
                        method,
                        body: formData
                    });
                }

                if (!response.ok) throw new Error('Error al guardar el equipo');
                const data = await response.json();
                this.$emit('equipo-saved', data);
                this.resetForm();
            } catch (error) {
                alert(error.message);
            }
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
