<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Aidam_Bo
 * @Date: 2023-02-07 09:46:44
 * @LastEditors: Aidam_Bo
 * @LastEditTime: 2023-02-24 10:07:18
-->
<template>
  <a-layout-sider
    v-model:collapsed="storeCollapsed.collapsed"
    :trigger="null"
    collapsible
    style="overflow-y: auto"
  >
    <div class="asideImg" v-show="storeCollapsed.collapsed">
      <a-image
        src="../../../public/favicon.ico"
        :width="70"
        :preview="false"
        style="height: 45px; padding: 5px"
      />
    </div>
    <div class="asideworld" v-show="!storeCollapsed.collapsed">×××××××××系统</div>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <template v-for="item in menuAsideList" :key="item.id">
        <a-menu-item
          v-if="!item.children || item.children.length === 0"
          :key="item.name"
          @click="redirectPage(item.url)"
        >
          <component :is="$antdVueIcons[item.icon]" />
          <span>{{ item.name }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="`sub${item.name}`">
          <template #icon>
            <component :is="$antdVueIcons[item.icon]" />
          </template>
          <template #title>{{ item.name }}</template>
          <a-menu-item
            @click="redirectPage(sub.url)"
            v-for="sub in item.children"
            :key="sub.name"
            >{{ sub.name }}</a-menu-item
          >
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
  import { useCollapsedStore } from '@/stores/collapsed/index.js';
  import { ref, watch } from 'vue';
  import { router } from '../../plugins/router';
  // import { menu } from './tempMenu';
  // eslint-disable-next-line no-unused-vars
  import { getSessionValue } from '@/utils/hooks/system/useStorage';
  import { menuList } from '@/stores/aside/index.js';
  // import { menuUserApi } from '@/api/system-manage/menu.js';

  const storeCollapsed = useCollapsedStore();
  const selectedKeys = ref(['数据汇总']);
  let menuAsideList = ref(menuList().asideMenu);
  watch(
    menuList,
    () => {
      menuAsideList.value = menuList().asideMenu;
    },
    { deep: true },
  );

  // onMounted(async () => {
  //   const { data } = await menuUserApi();
  //   menuList.value = data.data;
  // });

  const redirectPage = (path) => {
    router.push({ path });
  };
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #e5e3e3;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #bcb9b9;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #869494;
  }
  .asideImg {
    height: 55px;
    /* background-color: #218cff; */
    transition: background 0.3s;
    transition: width 0.3s;
  }
  .asideworld {
    white-space: nowrap;
    transition: background 0.3s;
    transition: width 0.3s;
    height: 55px;
    color: #fff;
    /* background-color: #218cff; */
    padding: 5px;
    font-size: 22px;
    font-weight: bold;
  }
  .ant-layout-sider {
    /* background: #0063f1 !important; */
  }
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    color: rgba(255, 255, 255, 0.8);
    /* background: #0063f1; */
  }
  ::v-deep .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    /* background: rgb(37, 142, 222, 0.5) !important; */
  }
</style>
