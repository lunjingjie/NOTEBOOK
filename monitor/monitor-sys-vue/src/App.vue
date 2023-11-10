<template>
  <a-config-provider :locale="zhCN">
    <div style="width: 100%; height: 100%">
      <app-layout></app-layout>
    </div>
  </a-config-provider>
</template>
<script setup>
  import AppLayout from '@/components/layout/AppLayout.vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>
