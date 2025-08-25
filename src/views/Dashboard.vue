<template>
    <b-container class="mt-5">
        <b-card class="shadow-sm p-4">
            <b-card-title class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="h4 font-weight-bold text-dark m-0">Catálogo de Equipos</h2>
                <b-button variant="primary" class="add-equipo-btn" @click="openAddModal">
                    <b-icon-plus-circle-fill></b-icon-plus-circle-fill> Agregar Equipo
                </b-button>
            </b-card-title>

            <hr class="my-4">

            <b-input-group class="mb-4">
                <b-form-input v-model="searchTerm" placeholder="Buscar equipo por título o detalle..."
                    debounce="500"></b-form-input>
                <b-input-group-append>
                    <b-button @click="searchTerm = ''" :disabled="!searchTerm">Limpiar</b-button>
                </b-input-group-append>
            </b-input-group>

            <h3 class="h5 text-left text-muted font-weight-bold my-4">Equipos Humanos</h3>
            <EquipoList :equipos="filteredHumanos" @edit-equipo="editEquipo" @remove-equipo="removeEquipo" />

            <h3 class="h5 text-left text-muted font-weight-bold my-4">Equipos Veterinarios</h3>
            <EquipoList :equipos="filteredVeterinarios" @edit-equipo="editEquipo" @remove-equipo="removeEquipo" />

            <b-modal v-model="showAddModal" :title="editingEquipo ? 'Editar Equipo' : 'Agregar Nuevo Equipo'"
                hide-footer size="lg" centered header-class="border-bottom-0 pb-0" body-class="pt-0"
                footer-class="border-top-0 pt-0" hide-header-close>
                <EquipoForm v-if="showAddModal" :key="formKey" :equipo-to-edit="editingEquipo"
                    @equipo-saved="handleEquipoSaved" @cancel="showAddModal = false" />
            </b-modal>
        </b-card>
    </b-container>
</template>

<script>
import EquipoList from '../components/EquipoList.vue';
import EquipoForm from '../components/EquipoForm.vue';

export default {
    name: 'DashboardView',
    components: {
        EquipoList,
        EquipoForm
    },
    data() {
        return {
            showAddModal: false,
            editingEquipo: null,
            searchTerm: '',
            formKey: 0,
        };
    },
    computed: {
        equipos() {
            return this.$store.state.equipos;
        },
        filteredEquipos() {
            if (!this.searchTerm) {
                return this.equipos;
            }
            const term = this.searchTerm.toLowerCase();
            return this.equipos.filter(equipo =>
                (equipo.titulo && equipo.titulo.toLowerCase().includes(term)) ||
                (equipo.detalle && equipo.detalle.toLowerCase().includes(term))
            );
        },
        filteredHumanos() {
            return this.filteredEquipos.filter(equipo => equipo.tipo === 'Humano');
        },
        filteredVeterinarios() {
            return this.filteredEquipos.filter(equipo => equipo.tipo === 'Veterinario');
        }
    },
    methods: {
        /**
         * Abre el modal para agregar un nuevo equipo, reseteando el equipo en edición.
         */
        openAddModal() {
            this.editingEquipo = null;
            this.formKey += 1;
            this.showAddModal = true;
        },
        /**
         * Cuando se hace clic en editar, carga el equipo en el formulario modal.
         * @param {Object} equipo - El objeto equipo a editar.
         */
        editEquipo(equipo) {
            this.editingEquipo = { ...equipo };
            this.formKey += 1;
            this.showAddModal = true;
        },
        /**
         * Maneja la eliminación de un equipo con una confirmación.
         * @param {number} equipoId - El ID del equipo a eliminar.
         */
        removeEquipo(equipoId) {
            this.$bvModal.msgBoxConfirm('¿Estás seguro de que quieres eliminar este equipo?', {
                title: 'Confirmar Eliminación',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Sí, Eliminar',
                cancelTitle: 'Cancelar',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
                .then(value => {
                    if (value) {
                        this.$store.commit('removeEquipo', equipoId);
                        this.$bvToast.toast('Equipo eliminado correctamente.', {
                            title: 'Éxito',
                            variant: 'success',
                            solid: true,
                            autoHideDelay: 3000
                        });
                    }
                })
                .catch(err => {
                    console.error("Error al confirmar eliminación:", err);
                });
        },
        /**
         * Se activa cuando un equipo ha sido guardado desde EquipoForm.
         * @param {FormData} formData - Los datos del equipo y archivos a guardar.
         */
        handleEquipoSaved(formData) {
            this.$store.dispatch('saveEquipo', formData);
            this.showAddModal = false;
            this.editingEquipo = null;
            this.$bvToast.toast('Equipo guardado correctamente.', {
                title: 'Éxito',
                variant: 'success',
                solid: true,
                autoHideDelay: 3000
            });
        }
    },
};
</script>

<style scoped>
/* Estilos específicos para este componente Dashboard */
.b-card {
    padding: 2rem;
    /* Espaciado interno generoso */
    border: none;
    /* Eliminar el borde predeterminado */
}

.b-card-title h2 {
    font-size: 1.75rem;
    /* Tamaño de título más grande */
    color: #212529;
    /* Color más oscuro para el título */
}

.add-equipo-btn {
    background-color: #007bff;
    /* Un azul primario elegante */
    border-color: #007bff;
    transition: all 0.3s ease;
}

.add-equipo-btn:hover {
    background-color: #0056b3;
    border-color: #0056b3;
    transform: translateY(-2px);
    /* Efecto sutil al pasar el ratón */
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
    /* Sombra al pasar el ratón */
}

hr {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    /* Línea divisoria muy sutil */
}
</style>