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

        <b-form-group label="Subir Imagen:" label-for="file-img" class="mb-4">
            <b-form-file id="file-img" v-model="form.imgFile" drop-placeholder="Arrastre la imagen aquí..."
                accept="image/*" @change="onImageFileChange" class="form-control-elegant" no-change-text="">
                <template #default="{ files }">
                    <span v-if="files && files.length > 0">
                        {{ files[0].name }}
                    </span>
                    <span v-else>Seleccione una imagen o arrástrela aquí...</span>
                </template>
            </b-form-file>
            <b-form-text class="mt-3 text-center" v-if="imgPreviewUrl">
                <b-img :src="imgPreviewUrl" thumbnail fluid alt="Previsualización de imagen"
                    class="img-preview"></b-img>
            </b-form-text>
            <b-form-text class="mt-2 text-muted" v-else-if="equipoToEdit && equipoToEdit.imgFileName">
                Imagen actual: <strong>{{ equipoTo - edit.imgFileName }}</strong>
            </b-form-text>
        </b-form-group>

        <b-form-group label="Subir PDF:" label-for="file-pdf" class="mb-4">
            <b-form-file id="file-pdf" v-model="form.pdfFile" drop-placeholder="Arrastre el PDF aquí..."
                accept="application/pdf" @change="onPdfFileChange" class="form-control-elegant" no-change-text="">
                <template #default="{ files }">
                    <span v-if="files && files.length > 0">
                        {{ files[0].name }}
                    </span>
                    <span v-else>Seleccione un archivo PDF o arrástrelo aquí...</span>
                </template>
            </b-form-file>
            <b-form-text class="mt-2 text-muted" v-if="equipoToEdit && equipoToEdit.pdfFileName && !form.pdfFile">
                PDF actual: <strong>{{ equipoTo - edit.pdfFileName }}</strong>
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
        equipoToEdit: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                id: null,
                tipo: 'Humano',
                titulo: '',
                detalle: '',
                imgFile: null,
                pdfFile: null
            },
            tipos: [
                { value: 'Humano', text: 'Humano' },
                { value: 'Veterinario', text: 'Veterinario' }
            ],
            imgPreviewUrl: null
        };
    },
    watch: {
        equipoToEdit: {
            handler(newVal) {
                if (newVal) {
                    this.form.id = newVal.id;
                    this.form.tipo = newVal.tipo;
                    this.form.titulo = newVal.titulo;
                    this.form.detalle = newVal.detalle;
                    this.form.imgFile = null;
                    this.form.pdfFile = null;
                    this.imgPreviewUrl = newVal.imgDataUrl || null;
                } else {
                    this.resetForm();
                }
            },
            immediate: true
        }
    },
    methods: {
        /**
         * Resetea el formulario a sus valores iniciales y la previsualización de la imagen.
         */
        resetForm() {
            this.form = {
                id: null,
                tipo: 'Humano',
                titulo: '',
                detalle: '',
                imgFile: null,
                pdfFile: null
            };
            if (this.imgPreviewUrl) {
                URL.revokeObjectURL(this.imgPreviewUrl);
                this.imgPreviewUrl = null;
            }
        },
        /**
         * Maneja el cambio de selección del archivo de imagen y crea una URL temporal para previsualizar.
         * @param {Event} event - El evento de cambio.
         */
        onImageFileChange(event) {
            const file = event.target.files[0];
            if (this.imgPreviewUrl) {
                URL.revokeObjectURL(this.imgPreviewUrl);
            }
            if (file) {
                this.imgPreviewUrl = URL.createObjectURL(file);
            } else {
                this.imgPreviewUrl = null;
            }
        },
        /**
         * Maneja el cambio de selección del archivo PDF.
         */
        onPdfFileChange() {
            // No se necesita lógica adicional aquí, ya que v-model maneja el archivo
        },
        /**
         * Maneja el envío del formulario.
         * Emite un evento 'equipo-saved' con los datos del equipo y los archivos.
         */
        async submitForm() {
            const savedEquipo = { ...this.form };

            if (this.form.imgFile) {
                savedEquipo.imgDataUrl = await this.fileToBase64(this.form.imgFile);
                savedEquipo.imgFileName = this.form.imgFile.name;
            } else if (this.equipoToEdit && this.equipoToEdit.imgDataUrl) {
                savedEquipo.imgDataUrl = this.equipoToEdit.imgDataUrl;
                savedEquipo.imgFileName = this.equipoToEdit.imgFileName;
            } else {
                savedEquipo.imgDataUrl = null;
                savedEquipo.imgFileName = null;
            }

            if (this.form.pdfFile) {
                savedEquipo.pdfFileName = this.form.pdfFile.name;
            } else if (this.equipoToEdit && this.equipoToEdit.pdfFileName) {
                savedEquipo.pdfFileName = this.equipoToEdit.pdfFileName;
            } else {
                savedEquipo.pdfFileName = null;
            }

            delete savedEquipo.imgFile;
            delete savedEquipo.pdfFile;

            this.$emit('equipo-saved', savedEquipo);
            this.resetForm();
        },
        /**
         * Convierte un objeto File a una cadena Base64.
         * @param {File} file - El objeto File a convertir.
         * @returns {Promise<string>} Una promesa que resuelve con la cadena Base64.
         */
        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    },
    beforeDestroy() {
        if (this.imgPreviewUrl) {
            URL.revokeObjectURL(this.imgPreviewUrl);
        }
    }
};
</script>

<style scoped>
/* Estilos específicos para el formulario */
.form-elegant {
    background-color: #ffffff;
}

.form-control-elegant {
    border: 1px solid #dee2e6;
    /* Borde suave */
    border-radius: 0.5rem;
    /* Esquinas redondeadas */
    padding: 0.75rem 1rem;
    transition: all 0.2s ease;
}

.form-control-elegant:focus {
    border-color: #80bdff;
    /* Borde azul suave al enfocar */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    /* Sombra de enfoque sutil */
}

/* Estilo para el componente b-form-file */
.form-control-elegant.custom-file-input {
    cursor: pointer;
}

.img-preview {
    max-width: 180px;
    max-height: 180px;
    object-fit: contain;
    margin-top: 15px;
    border: 1px solid #e9ecef;
    padding: 8px;
    border-radius: 0.75rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.action-btn {
    font-size: 1rem;
    padding: 0.6rem 1.5rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
}

.save-btn {
    background-color: #28a745;
    /* Verde para guardar */
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
    /* Gris para cancelar */
    color: #6c757d;
}

.cancel-btn:hover {
    background-color: #6c757d;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(108, 117, 125, 0.2);
}
</style>