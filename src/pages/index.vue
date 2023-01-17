<script setup lang="ts">
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
onMounted(async () => {
  await metricsStore.fetchMetrics()
})
        const editingRows = ref([]);
        const selectedMetric = ref();
        const productDialog = ref(false);
        const submitted = ref(false);
        const metric = ref<Metric | null>(null);
        const deleteProductDialog = ref(false);

        const onRowEditSave = (event) => {
            let { newData, index } = event;
            metricsStore.updateMetric(newData, index)
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
            deleteProductDialog.value = true;
        };

        const hideDialog = () => {
            productDialog.value = false;
            submitted.value = false;
        };

        const saveProduct = async () => {
            submitted.value = true;

			      if (metric.value) {
                productDialog.value = false;
                await metricsStore.addMetric(metric.value).then(() => {
                  console.log(metricsStore.items);
                });
                metric.value = null;
            }
        };
        const deleteProduct = () => {
            deleteProductDialog.value = false;
            metricsStore.deleteMetric(selectedMetric.value.id)
            //toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
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
            <DataTable :totalRecords="metricsStore.itemsLength" v-model:selection="selectedMetric" :value="metricsStore.items" editMode="row" dataKey="id" v-model:editingRows="editingRows" @row-edit-save="onRowEditSave" responsiveLayout="scroll">
              <Column selectionMode="single" headerStyle="width: 3em"/>
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
            <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <div class="field mb-2">
                <label for="code">Code</label>
                <InputText id="code" v-model="metric.code" required="true" autofocus :class="{'p-invalid': submitted && !metric.code}" />
                <small class="p-error" v-if="submitted && !metric.code">Code is required.</small>
            </div>
            <div class="field mb-2">
                <label for="amounts">Amounts</label>
                <InputText id="amounts" v-model="metric.amounts" required="true" autofocus :class="{'p-invalid': submitted && !metric.amounts}" />
            </div>
            <div class="field">
                <label for="date">Date</label>
                <Calendar id="date" v-model="metric.date" required="true" autofocus :class="{'p-invalid': submitted && !metric.date}" />
                <small class="p-error" v-if="submitted && !metric.date">Date is required.</small>
            </div>
              <template #footer>
                  <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                  <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
              </template>
            </Dialog>
            <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="metric">Are you sure you want to delete <b>{{metric.code}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
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
