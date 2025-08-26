<template>
    <div>
        <b-table striped hover :items="equipos" :fields="fields" primary-key="id" class="text-center elegant-table"
            responsive="sm">
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
                { key: "titulo", label: "Título", class: "text-left" },
                { key: "detalle", label: "Detalle", class: "text-center" },
                { key: "acciones", label: "Acciones", class: "text-center" },
            ],
        };
    },
};
</script>

<style scoped>
/* Estilos específicos para la tabla de equipos */
.elegant-table {
    border-collapse: separate;
    border-spacing: 0 10px;
}

.elegant-table>>>th {
    background-color: #e9ecef;
    border-bottom: 2px solid #dee2e6;
    padding: 1rem;
    font-weight: 600;
    color: #495057;
    text-transform: uppercase;
    font-size: 0.9rem;
}

/* Ocultar el texto de screen readers que aparece en sortable headers */
.elegant-table th .sr-only {
    display: none;
}

.elegant-table>>>td {
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem;
    vertical-align: middle;
}

.elegant-table>>>tr:hover td {
    background-color: #f0f3f5;
}

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

.action-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    margin-left: 5px;
}

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
</style>
