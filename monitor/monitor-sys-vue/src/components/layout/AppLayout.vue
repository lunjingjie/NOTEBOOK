<template>
  <a-layout class="layout-total">
    <!-- <app-sider v-if="storeLogin.isLogin && storeLayout.showLayout"></app-sider> -->
    <a-layout>
      <app-header v-if="storeLogin.isLogin && storeLayout.showLayout"></app-header>
      <div style="background: #fff">
        <LayoutTab></LayoutTab>
      </div>
      <a-layout-content
        id="layoutContent"
        :style="{
          margin: storeLayout.showLayout ? '8px 8px' : '',
          padding: storeLayout.showLayout ? '5px' : '',
          // background: storeLayout.showLayout ? '#fff' : '',
          minHeight: storeLayout.showLayout ? '280px' : '',
        }"
        style="overflow-y: auto"
        class="scroll-bar"
      >
        <router-view>
          <template #defalult="{ Component, route }">
            <transition mode="out-in" appear>
              <component :is="Component" :key="route.fullPath" />
            </transition>
          </template>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-modal v-model:visible="storeLayout.showModel" width="500px">
    <template #title>
      <div style="font-size: 16px; color: #fc9027; font-weight: bold">
        <ExclamationCircleOutlined /> 弱密码提示
      </div>
    </template>
    <template #footer>
      <a-button key="back" @click="storeLayout.showModel = false">下次更改</a-button>
      <a-button type="primary" @click="toAmendPw">确认</a-button>
    </template>
    <div></div>
    <div style="align-items: center"> 系统监测到当前账号密码为弱密码，是否更改密码？ </div>
  </a-modal>
</template>
<script setup>
  // import AppSider from '@/components/layout/AppSider.vue';
  // import AppTab from '@/components/layout/AppTab.vue';
  import AppHeader from '@/components/layout/AppHeader.vue';
  import { useLoginStore } from '@/stores/login/index.js';
  import { useLayoutStore } from '@/stores/layout/index.js';
  import { router } from '@/plugins/router';
  import { watch } from 'vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import LayoutTab from '@/components/tabs/indexPage.vue';

  const storeLogin = useLoginStore();
  const storeLayout = useLayoutStore();

  watch(router.currentRoute, () => {
    document.getElementById('layoutContent').scrollTo(0, 0);
  });
  const toAmendPw = () => {
    storeLayout.showModel = false;
    router.push({ path: '/systemAmendPw' });
  };
</script>
<style scoped lang="scss"></style>
<style>
  .layout-total {
    height: 100vh !important;
    overflow-y: hidden;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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
</style>
