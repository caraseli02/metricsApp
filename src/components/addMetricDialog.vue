<script setup lang="ts">
import InputText from 'primevue/inputtext';
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

  if (newItem) {
    showMetricDialog.value = false;
    await metricsStore.addMetric()
  }
};
</script>

<template>
    <Dialog v-model:visible="metricsStore.showMetricDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
      class="p-fluid">
      <div class="field mb-2">
        <label for="code">Code</label>
        <InputText id="code" v-model="newItem.code" required="true" autofocus
          :class="{ 'p-invalid': submitted && !newItem.code }" />
        <small class="p-error" v-if="submitted && !newItem.code">Code is required.</small>
      </div>
      <div class="field mb-2">
        <label for="amounts">Amounts</label>
        <InputText id="amounts" v-model="newItem.amounts" required="true" autofocus
          :class="{ 'p-invalid': submitted && !newItem.amounts }" />
      </div>
      <div class="field">
        <label for="date">Date</label>
        <Calendar id="date" v-model="newItem.date" required="true" autofocus
          :class="{ 'p-invalid': submitted && !newItem.date }" />
        <small class="p-error" v-if="submitted && !newItem.date">Date is required.</small>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>
</template>

<style scoped>

</style>
