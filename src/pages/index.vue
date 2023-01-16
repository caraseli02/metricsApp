<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { useMetricsStore } from '../stores/metricsStore';

const metricsStore = useMetricsStore()
metricsStore.fetchMetrics()
        const editingRows = ref([]);

        const onRowEditSave = (event) => {
            let { newData, index } = event;

            metrics.value[index] = newData;
        };

        const toLocaleDateString = (date: string) => new Date(date).toLocaleDateString()
</script>

<template>
          <div class="card">
            <DataTable :value="metricsStore.items" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
              <Column field="id" header="ID" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
              <Column field="code" header="Code" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" autofocus />
                    </template>
                </Column>
                <Column field="amounts" header="Amounts" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
                <Column field="date" header="date" style="width:20%">
                    <template #editor="{ data, field }">
                      <Calendar inputId="basic" v-model="data[field]" autocomplete="off" />
                    </template>
                    <template #body="{ data, field }">
                      <span>
                        {{ toLocaleDateString(data[field]) }}
                      </span>
                    </template>
                </Column>
                <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
            </DataTable>
        </div>
</template>

<style scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
