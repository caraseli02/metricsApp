<script setup>
import { computed, ref } from 'vue'
import { hstEvent } from 'histoire/client'
import Button from './Button.vue'
</script>

<template>
  <Story title="Buttons" :layout="{ type: 'grid', width: '300px' }">
    <Variant
      title="Basic"
    >
      <Button label="Submit" />
      <Button label="Disabled" disabled="disabled" />
      <Button label="Link" class="p-button-link" />
    </Variant>
    <template #controls>
      <HstText v-model="text" title="default slot" />
    </template>
  </Story>
</template>
