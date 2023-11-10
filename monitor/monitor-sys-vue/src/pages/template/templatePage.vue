<template>
  <CSelect :options="options" v-model:value="select"></CSelect>
</template>
<script setup>
  import CSelect from '@/components/antdv/Select/src/BasicSelect.vue';
  import { ref, watch } from 'vue';

  const options = ref([
    {
      label: 'test',
      value: 'test',
    },
  ]);
  const select = ref('');

  watch(select, (val) => {
    console.log(val);
  });
</script>
