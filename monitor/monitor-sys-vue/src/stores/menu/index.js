import { defineStore } from 'pinia';
// import { getSessionValue } from '@/utils/hooks/system/useStorage';
import { ref } from 'vue';
// import { useRouter } from 'vue-router';

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([
    {
      path: '',
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
      path: '',
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
      path: '',
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
  const menuArray = ref([]);
  const menuUrl = ref([]);
  // const menuList = ref(JSON.parse(getSessionValue('menuList')));
  const adminmenu = {
    data: [
      {
        url: '/template',
        name: '模板',
        children: [],
      },
      {
        url: '/systemAmendPw',
        name: 'systemAmendPw',
        children: [],
      },
      {
        url: '/admin',
        name: 'admin',
        children: [],
      },
      {
        url: '/video',
        name: 'video',
        children: [],
      },
    ],
  };
  const othermenu = {
    data: [
      {
        url: '/template',
        name: '模板',
        children: [],
      },
      {
        url: '/systemAmendPw',
        name: 'systemAmendPw',
        children: [],
      },
      {
        url: '/user',
        name: 'user',
        children: [],
      },
    ],
  };
  const addMenu = (menu) => {
    menuArray.value.push(menu);
    menuArray.value.forEach((item) => {
      item.forEach((value) => {
        menuUrl.value.push(value.url);
      });
    });
  };

  return { menuArray, menuList, menuUrl, adminmenu, othermenu, addMenu };
});
