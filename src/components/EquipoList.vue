<template>
    <div>
        <!-- Tabla de equipos -->
        <b-table striped hover :items="equipos" :fields="fields" primary-key="id" class="text-center elegant-table"
            responsive="sm">

            <!-- Miniatura de la imagen -->
            <template #cell(img)="data">
                <div v-if="data.item.img">
                    <img :src="`https://mmedical.cl/uploads/${data.item.img}`" alt="Equipo" class="equipo-img" />
                </div>
                <div v-else class="no-image-placeholder">
                    <b-icon-image></b-icon-image>
                </div>
            </template>

            <!-- Acciones -->
            <template #cell(acciones)="data">
                <b-button size="sm" variant="outline-info" class="mr-2 action-btn"
                    @click="$emit('edit-equipo', data.item)">
                    <b-icon-pencil-square></b-icon-pencil-square>
                </b-button>
                <b-button size="sm" variant="outline-danger" class="action-btn"
                    @click="$emit('remove-equipo', data.item.id)">
                    <b-icon-trash-fill></b-icon-trash-fill>
                </b-button>
            </template>

            <!-- Si no hay equipos -->
            <template #empty>
                <p class="text-center text-muted py-3">No hay equipos registrados aún.</p>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: "EquipoList",
    props: {
        equipos: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
    data() {
        return {
            fields: [
                { key: "img", label: "Imagen", class: "text-center" },
                { key: "titulo", label: "Título", class: "text-left" },
                { key: "detalle", label: "Detalle", class: "text-center" },
                { key: "acciones", label: "Acciones", class: "text-center" },
            ],
        };
    }
};
</script>

<style scoped>
/* Miniaturas */
.equipo-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.no-image-placeholder {
    width: 60px;
    height: 60px;
    border: 1px dashed #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #aaa;
}
</style>
