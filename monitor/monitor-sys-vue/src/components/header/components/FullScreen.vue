<template>
  <a-tooltip :title="getTitle" placement="bottom">
    <span @click="toggle">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </a-tooltip>
</template>
<script setup name="FullScreen">
  import { useFullscreen } from '@vueuse/core';
  import { computed, unref } from 'vue';

  const { toggle, isFullscreen } = useFullscreen();

  const getTitle = computed(() => {
    return unref(isFullscreen) ? '退出全屏' : '全屏';
  });
</script>
