<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from '~/components/buttons/Button.vue';
import { useMetricsStore } from '~/stores/metricsStore';
import { storeToRefs } from 'pinia'

const metricsStore = useMetricsStore()
const {newItem, showMetricDialog, submitted} = storeToRefs(metricsStore)

const hideDialog = () => {
  metricsStore.showMetricDialog = false;
  metricsStore.submitted = false;
};

const saveProduct = async () => {
  submitted.value = true;

  if (newItem.value.code.trim()) {
    showMetricDialog.value = false;
    await metricsStore.addMetric()
  }
};
</script>

<template>
    <Dialog v-model:visible="metricsStore.showMetricDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
      class="p-fluid">
      <div class="field mb-2">
        <label class="mb-2 block" for="code">Code</label>
        <InputText id="code" v-model="newItem.code" required="true" autofocus
          :class="{ 'p-invalid': submitted && !newItem.code }" />
        <small class="p-error" v-if="submitted && newItem.code.length === 0">Code is required.</small>
      </div>
      <div class="field mb-2 ">
        <label class="mb-2 block" for="amounts">Amounts</label>
        <InputNumber id="amounts" v-model="newItem.amounts" required="true" autofocus />
      </div>
      <div class="field">
        <label class="mb-2 block" for="date">Date</label>
        <Calendar id="date" v-model="newItem.date" required="true" autofocus
          :class="{ 'p-invalid': submitted && !newItem.date }" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>
</template>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
.block{
  display: block;
}
</style>
