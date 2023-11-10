import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCollapsedStore = defineStore('collapsed', () => {
  const collapsed = ref(false);
  function setCollapsed() {
    collapsed.value = !collapsed.value;
  }

  return { collapsed, setCollapsed };
});
