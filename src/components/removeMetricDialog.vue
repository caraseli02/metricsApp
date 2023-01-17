<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from '~/components/buttons/Button.vue';
import { useMetricsStore } from '../stores/metricsStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  selectedMetricId: string
}>()

const metricsStore = useMetricsStore()
const {newItem, deleteProductDialog} = storeToRefs(metricsStore)

const deleteProduct = () => {
  deleteProductDialog.value = false;
  metricsStore.deleteMetric(props.selectedMetricId)
  //toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
</script>

<template>
  <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="newItem">Are you sure you want to delete <b>{{ newItem.code }}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false" />
      <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
    </template>
  </Dialog>
</template>

<style scoped>

</style>
