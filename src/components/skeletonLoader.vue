<script setup lang="ts">

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';
const products = ref(new Array(4));

</script>

<template>
  <DataTable :value="products" responsiveLayout="scroll">
    <Column field="id" header="ID">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="code" header="Code">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="amounts" header="Amounts">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column field="date" header="Date">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>
</template>


<style scoped>
.custom-skeleton {
  border: 1px solid var(--surface-border);
  border-radius: 4px;
}

ul {
  list-style: none;
}
</style>
