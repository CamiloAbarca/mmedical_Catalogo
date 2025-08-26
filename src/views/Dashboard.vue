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

            <b-row>
                <b-col md="6" class="scrolling-column">
                    <h3 class="h5 text-left text-muted font-weight-bold my-4">Equipos Humanos</h3>
                    <b-input-group class="mb-4">
                        <b-form-input v-model="searchHumanosTerm" placeholder="Buscar equipos humanos..."
                            debounce="500"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="searchHumanosTerm = ''" :disabled="!searchHumanosTerm">Limpiar</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <EquipoList :equipos="filteredHumanos" @edit-equipo="editEquipo" @remove-equipo="removeEquipo" />
                </b-col>

                <b-col md="6" class="scrolling-column">
                    <h3 class="h5 text-left text-muted font-weight-bold my-4">Equipos Veterinarios</h3>
                    <b-input-group class="mb-4">
                        <b-form-input v-model="searchVeterinariosTerm" placeholder="Buscar equipos veterinarios..."
                            debounce="500"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="searchVeterinariosTerm = ''"
                                :disabled="!searchVeterinariosTerm">Limpiar</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <EquipoList :equipos="filteredVeterinarios" @edit-equipo="editEquipo"
                        @remove-equipo="removeEquipo" />
                </b-col>
            </b-row>

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
    components: { EquipoList, EquipoForm },
    data() {
        return {
            showAddModal: false,
            editingEquipo: null,
            searchHumanosTerm: '', // Nueva variable para la búsqueda de equipos humanos
            searchVeterinariosTerm: '', // Nueva variable para la búsqueda de equipos veterinarios
            formKey: 0,
        };
    },
    computed: {
        equipos() {
            return this.$store.state.equipos;
        },
        filteredHumanos() {
            const term = this.searchHumanosTerm.toLowerCase();
            return this.equipos.filter(equipo =>
                equipo.tipo === 'Humano' &&
                ((equipo.titulo && equipo.titulo.toLowerCase().includes(term)) ||
                    (equipo.detalle && equipo.detalle.toLowerCase().includes(term)))
            );
        },
        filteredVeterinarios() {
            const term = this.searchVeterinariosTerm.toLowerCase();
            return this.equipos.filter(equipo =>
                equipo.tipo === 'Veterinario' &&
                ((equipo.titulo && equipo.titulo.toLowerCase().includes(term)) ||
                    (equipo.detalle && equipo.detalle.toLowerCase().includes(term)))
            );
        }
    },
    created() {
        this.$store.dispatch("fetchEquipos");
    },
    methods: {
        openAddModal() {
            this.editingEquipo = null;
            this.formKey += 1;
            this.showAddModal = true;
        },
        editEquipo(equipo) {
            this.editingEquipo = { ...equipo };
            this.formKey += 1;
            this.showAddModal = true;
        },
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
                        this.$store.dispatch("deleteEquipo", equipoId);
                        this.$bvToast.toast('Equipo eliminado correctamente.', {
                            title: 'Éxito',
                            variant: 'success',
                            solid: true,
                            autoHideDelay: 3000
                        });
                    }
                })
                .catch(err => console.error("Error al confirmar eliminación:", err));
        },
        async handleEquipoSaved(equipoData) {
            try {
                const savedEquipo = await this.$store.dispatch('saveEquipo', equipoData);
                this.showAddModal = false;
                this.editingEquipo = null;

                this.$store.dispatch("fetchEquipos");

                this.$bvToast.toast(`Equipo "${savedEquipo.titulo}" guardado correctamente.`, {
                    title: 'Éxito', variant: 'success', solid: true, autoHideDelay: 3000
                });
            } catch (error) {
                this.$bvToast.toast(`Error al guardar el equipo: ${error.message}`, {
                    title: 'Error', variant: 'danger', solid: true, autoHideDelay: 5000
                });
            }
        }
    },
};
</script>

<style scoped>
.b-card {
    padding: 2rem;
    border: none;
}

.b-card-title h2 {
    font-size: 1.75rem;
    color: #212529;
}

.add-equipo-btn {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s ease;
}

.add-equipo-btn:hover {
    background-color: #0056b3;
    border-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

hr {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

/* Estilo para las columnas con scroll independiente */
.scrolling-column {
    height: 70vh;
    /* Altura de la columna, puedes ajustarla */
    overflow-y: auto;
    padding: 0 1rem;
}
</style>