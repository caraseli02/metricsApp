<script setup lang="ts">
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Button from '~/components/buttons/Button.vue';
import { useMetricsStore } from '../stores/metricsStore';
import { generateId } from '../../services/backend';
import { Metric } from '~/types/metric';


const metricsStore = useMetricsStore()
metricsStore.fetchMetrics()
        const editingRows = ref([]);
        const selectedProducts = ref();
        const productDialog = ref(false);
        const submitted = ref(false);
        const metric = ref<Metric | null>(null);

        const onRowEditSave = (event) => {
            let { newData, index } = event;

            //metrics.value[index] = newData;
        };

        const toLocaleDateString = (date: string) => new Date(date).toLocaleDateString()

        const openNew = () => {
            metric.value = {
              id: generateId(),
              code: '',
              amounts: [],
              date: new Date(),

            };
            submitted.value = false;
            productDialog.value = true;
        };

        const confirmDeleteSelected = () => {
            // deleteProductsDialog.value = true;
        };

        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };

        const saveProduct = () => {
            submitted.value = true;

			      if (metric.value) {
                productDialog.value = false;
                metricsStore.addMetric(metric.value);
                metric.value = null;
            }
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
            <DataTable v-model:selection="selectedProducts" :value="metricsStore.items" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
              <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
              <Column field="id" header="ID" style="width:20%">
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field]" />
                    </template>
                </Column>
              <Column field="amounts" header="Code" style="width:20%">
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
            <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <div class="field mb-2">
                <label for="code">Code</label>
                <InputText id="code" v-model.trim="metric.code" required="true" autofocus :class="{'p-invalid': submitted && !metric.code}" />
                <small class="p-error" v-if="submitted && !metric.code">Code is required.</small>
            </div>
            <div class="field mb-2">
                <label for="amounts">Amounts</label>
                <InputText id="amounts" v-model.trim="metric.amounts" required="true" autofocus :class="{'p-invalid': submitted && !metric.amounts}" />
            </div>
            <div class="field">
                <label for="date">Date</label>
                <Calendar id="date" v-model.trim="metric.date" required="true" autofocus :class="{'p-invalid': submitted && !metric.date}" />
                <small class="p-error" v-if="submitted && !metric.date">Date is required.</small>
            </div>
              <template #footer>
                  <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                  <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
              </template>
            </Dialog>
        </div>
</template>

<style scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
    padding-top: 0;
    padding-bottom: 0;
}
</style>
