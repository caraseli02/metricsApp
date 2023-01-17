<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Toolbar from 'primevue/toolbar';
import Button from '~/components/buttons/Button.vue';
import { useMetricsStore } from '../stores/metricsStore';
import { generateId } from '../../services/backend';
import { Metric } from '~/types/metric';
import { storeToRefs } from 'pinia';


const metricsStore = useMetricsStore()
const {newItem, deleteProductDialog, submitted, showMetricDialog} = storeToRefs(metricsStore)
onMounted(async () => {
  await metricsStore.fetchMetrics()
})
const editingRows = ref([]);
const selectedMetric = ref();

const onRowEditSave = (event: {newData: Metric, index: number}) => {
  let { newData, index } = event;
  metricsStore.updateMetric(newData, index)
};

const toLocaleDateString = (date: string) => new Date(date).toLocaleDateString()

const openNew = () => {
  newItem.value = {
    id: generateId(),
    code: '',
    amounts: [],
    date: new Date(),
  };
  submitted.value = false;
  showMetricDialog.value = true;
};

const confirmDeleteSelected = () => {
  deleteProductDialog.value = true;
};
</script>

<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <Button label="New" icon="pi pi-plus" @click="openNew" />
      </template>
      <template #end>
        <Button label="Delete" icon="pi pi-trash" class="p-button-danger ml-2" @click="confirmDeleteSelected" />
      </template>
    </Toolbar>
    <DataTable :totalRecords="metricsStore.itemsLength" v-model:selection="selectedMetric" :value="metricsStore.items"
      editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave"
      responsiveLayout="scroll">
      <Column selectionMode="single" headerStyle="width: 3em" />
      <Column :rowEditor="false" field="id" header="ID" style="width:20%" />
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
      <Column field="date" header="Date" style="width:20%">
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
    <addMetricDialog />
    <removeMetricDialog :selectedMetricId="selectedMetric?.id" />
  </div>
</template>

<style scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
