<template>
  <a-layout-header
    style="
      background: #fff;
      padding: 0 20px;
      height: 49px !important;
      line-height: 48px !important;
      z-index: 1000;
      border-bottom: 1px solid #eee;
    "
  >
    <FlexBox
      flexDirection="row"
      justifyContent="space-between"
      style="{ margin: '0 10px', height: '48px' }"
    >
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        style="{ margin: '0 10px', height: '48px' }"
      >
        <HeaderTitle></HeaderTitle>
        <!-- <menu-unfold-outlined
          v-if="store.collapsed"
          class="trigger"
          @click="store.setCollapsed()"
        />
        <menu-fold-outlined v-else class="trigger" @click="store.setCollapsed()" /> -->
        <!-- <App-top-nav style="margin-left: 10px"></App-top-nav> -->
        <LayoutMenu :isHorizontal="true"></LayoutMenu>
      </FlexBox>
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        style="{ margin: '0 5px', height: '48px' }"
      >
        <FullScreen class="header-action__item"></FullScreen>
        <a-dropdown placement="bottomLeft" class="header-action__item">
          <div>
            <a-avatar style="background-color: #1890ff" :size="24" class="user-admin">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
            <span class="user-admin" style="padding-left: 10px">{{ userName }}</span>
          </div>
          <template #overlay>
            <a-menu>
              <!-- <a-menu-item @click="amendPw"> 更改密码 </a-menu-item> -->
              <a-menu-item><ordered-list-outlined style="margin-right: 5px" />操作手册</a-menu-item>
              <a-menu-item><team-outlined style="margin-right: 5px" />关于系统 </a-menu-item>
              <a-menu-item @click="loginOut"
                ><logout-outlined style="margin-right: 5px" />
                <!-- <span class="iconify" style="font-size: 16px" data-icon="ion:power-outline"></span> -->
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </FlexBox>
    </FlexBox>
  </a-layout-header>
</template>
<script setup>
  import { UserOutlined } from '@ant-design/icons-vue';
  import { useLoginStore } from '../../stores/login';
  import { getSessionValue } from '@/utils/hooks/system/useStorage';
  import { ref } from 'vue';
  import { FullScreen } from '../header';
  import FlexBox from '@/components/FlexBox/flexWrap.vue';
  import { HeaderTitle } from '@/components/header';
  import LayoutMenu from '@/components/header/components/menu/LayoutMenu.vue';

  const { loginOut } = useLoginStore();
  const userName = ref(getSessionValue('userName'));
</script>

<style lang="scss" scoped>
  .header-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    bottom: 5px;
  }
  .user-admin:hover {
    cursor: pointer;
  }
</style>
