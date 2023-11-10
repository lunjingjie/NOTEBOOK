const routeList = [
  //静态路由
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('@/pages/common/login/loginPage.vue'),
    type: 'basic',
  },
  {
    path: '/template',
    name: 'templatePage',
    component: () => import('@/pages/template/templatePage.vue'),
    type: 'basic',
  },
  {
    path: '/template2',
    name: 'templatePage2',
    component: () => import('@/pages/template/templatePage2.vue'),
    type: 'basic',
  },
  {
    path: '/systemAmendPw',
    name: 'amendPwPage',
    component: () => import('@/pages/common/amendPassword/amendPwPage.vue'),
  },
  {
    path: '/incompatible',
    name: 'incompatible',
    component: () => import('@/components/incompatible/indexPage.vue'),
    type: 'basic',
  },
  {
    path: '/video',
    name: 'videoPage',
    component: () => import('@/pages/common/video/videoPage.vue'),
  },

  {
    path: '/500',
    name: '500Page',
    component: () => import('@/pages/common/500/500Page.vue'),
    type: 'basic',
  },
  {
    path: '/404',
    name: '404Page',
    component: () => import('@/pages/common/404/404Page.vue'),
    type: 'basic',
  },
  // { path: '/:catchAll(.*)', redirect: '/404', hidden: true },
];

export const basicRoutes = routeList.filter((item) => item.type === 'basic');

export default routeList;
