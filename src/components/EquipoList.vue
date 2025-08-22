<template>
    <div>
        <b-table striped hover :items="equipos" :fields="fields" primary-key="id" class="text-center elegant-table"
            responsive="sm">
            <template #cell(img)="data">
                <b-img v-if="data.item.imgDataUrl" :src="data.item.imgDataUrl" alt="Imagen del equipo" width="60"
                    height="60" rounded thumbnail class="equipo-img m-1"></b-img>
                <div v-else class="no-image-placeholder">
                    <b-icon-image-fill font-scale="1.5" class="text-muted"></b-icon-image-fill>
                    <br>
                    <small v-if="data.item.imgFileName" class="text-muted">{{ data.item.imgFileName }}</small>
                    <small v-else class="text-muted">No hay imagen</small>
                </div>
            </template>

            <template #cell(pdf)="data">
                <span v-if="data.item.pdfFileName" class="d-block">
                    <b-icon-file-earmark-pdf-fill variant="danger" font-scale="1.2"></b-icon-file-earmark-pdf-fill>
                    <span class="d-block text-muted small mt-1">{{ data.item.pdfFileName }}</span>
                </span>
                <span v-else class="text-muted">N/A</span>
            </template>

            <template #cell(acciones)="data">
                <b-button size="sm" variant="outline-info" class="mr-2 action-btn"
                    @click="$emit('edit-equipo', data.item)">
                    <b-icon-pencil-square></b-icon-pencil-square> Editar
                </b-button>
                <b-button size="sm" variant="outline-danger" class="action-btn"
                    @click="$emit('remove-equipo', data.item.id)">
                    <b-icon-trash-fill></b-icon-trash-fill> Eliminar
                </b-button>
            </template>

            <template #empty>
                <p class="text-center text-muted py-3">No hay equipos registrados aún.</p>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'EquipoList',
    props: {
        equipos: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            fields: [
                { key: 'img', label: 'Imagen', class: 'text-center' },
                { key: 'titulo', label: 'Título', sortable: true, class: 'text-left' },
                { key: 'detalle', label: 'Detalle', class: 'text-left' },
                { key: 'pdf', label: 'PDF', class: 'text-center' },
                { key: 'acciones', label: 'Acciones', class: 'text-center' }
            ]
        };
    }
};
</script>

<style scoped>
/* Estilos específicos para la tabla de equipos */
.elegant-table {
    border-collapse: separate;
    /* Permite bordes redondeados en las celdas */
    border-spacing: 0 10px;
    /* Espacio entre filas */
}

.elegant-table>>>th {
    background-color: #e9ecef;
    /* Fondo claro para los encabezados */
    border-bottom: 2px solid #dee2e6;
    /* Borde inferior más pronunciado */
    padding: 1rem;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    font-size: 0.9rem;
}

.elegant-table>>>td {
    background-color: #ffffff;
    /* Fondo blanco para las celdas */
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    /* Borde sutil entre filas */
    padding: 1rem;
    vertical-align: middle;
}

.elegant-table>>>tr:hover td {
    background-color: #f0f3f5;
    /* Cambio de color sutil al pasar el ratón */
}

/* Bordes redondeados para la tabla completa (pseudo-clases) */
.elegant-table>>>thead th:first-child {
    border-top-left-radius: 0.75rem;
}

.elegant-table>>>thead th:last-child {
    border-top-right-radius: 0.75rem;
}

.elegant-table>>>tbody tr:last-child td:first-child {
    border-bottom-left-radius: 0.75rem;
}

.elegant-table>>>tbody tr:last-child td:last-child {
    border-bottom-right-radius: 0.75rem;
}

.equipo-img {
    object-fit: cover;
    /* Asegura que la imagen se ajuste bien */
    border: 1px solid #e0e0e0;
}

.no-image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    border: 1px dashed #ced4da;
    border-radius: 0.5rem;
    margin: 0 auto;
    color: #6c757d;
    font-size: 0.75rem;
}

/* Estilo para los botones de acción */
.action-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    margin-left: 5px;
}

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
}
</style>