<template>
  <BasicMenu :isHorizontal="isHorizontal" :items="menus" :mode="getMenuMode"></BasicMenu>
</template>
<script setup name="LayoutMenu">
  import BasicMenu from '@/components/menu/BasicMenu.vue';
  import { toRefs, ref, computed } from 'vue';
  import { MenuModeConstant } from '@/constants';

  const props = defineProps({
    isHorizontal: {
      type: Boolean,
      default: true,
    },
  });

  const { isHorizontal } = toRefs(props);
  const getMenuMode = computed(() => {
    return isHorizontal.value ? MenuModeConstant.HORIZONTAL : MenuModeConstant.INLINE;
  });
  // icon: https://icones.js.org/
  const menus = ref([
    {
      path: '/dashboard',
      name: 'dashboard',
      title: 'dashboard',
      icon: 'ion:grid-outline',
      children: [
        {
          path: '/dashboard/analysis',
          route: '1',
          icon: 'ant-design:bank-filled',
          title: '首页',
          name: 'dashboard-analysis',
        },
      ],
    },
    {
      path: '/route',
      name: 'dashboard1',
      title: 'test',
      icon: 'ion:grid-outline',
      children: [
        {
          path: '/template',
          route: '1',
          icon: 'ant-design:bank-filled',
          title: 'test1',
          name: 'test1',
        },
        {
          path: '/template2',
          route: '1',
          icon: 'ant-design:bank-filled',
          title: 'test2',
          name: 'test2',
        },
      ],
    },
    {
      path: '/dashboard2',
      name: 'dashboard2',
      title: 'dashboard2',
      icon: 'ion:grid-outline',
      children: [
        {
          path: '/dashboard/analysis',
          route: '1',
          icon: 'ant-design:bank-filled',
          title: '首页',
          name: 'dashboard-analysis',
        },
      ],
    },
  ]);
</script>
