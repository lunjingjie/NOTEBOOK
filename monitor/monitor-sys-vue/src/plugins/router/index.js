import { createRouter, createWebHistory } from 'vue-router';
import { getSessionValue } from '../../utils/hooks/system/useStorage';
import { setTokenInHeader } from '@/plugins/axios';
import { useLoginStore } from '@/stores/login';
import { useLayoutStore } from '@/stores/layout';
// import { useMenuStore } from '../../stores/menu';
import { basicRoutes } from './routerList';
import { checkBrowser } from '@/plugins/browser';
import { ref } from 'vue';
import { setRouteChange } from '../../utils/routeChange';

// 白名单
const WHITE_NAME_LIST = [];
const getRouteNames = (array) => {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
};
getRouteNames(basicRoutes);

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes,
  strict: true,
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
});

export function resetRouter() {
  router.getRoutes.forEach((route) => {
    const { name } = route;
    if (name) {
      if (name && !WHITE_NAME_LIST.includes(name)) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    }
  });
}

export function initRouter(app) {
  app.use(router);
}

router.beforeEach((to, from, next) => {
  const token = getSessionValue('token');
  const storeLogin = useLoginStore();
  const storeLayout = useLayoutStore();

  if (token !== null && storeLogin.token === null && to.name !== 'loginPage') {
    storeLogin.setToken(token);
    setTokenInHeader(token);
    //解决刷新后动态路由消失的问题，再重新添加一遍
    /*代码太累赘了，待修改  */
    // const menu = JSON.parse(getSessionValue('menuList'));
    // menu[0].children.forEach((item) => {
    //   if (item.children) {
    //     item.children.forEach((index) => {
    //       if (index.children) {
    //         index.children.forEach((value) => {
    //           router.addRoute({
    //             path: value.url,
    //             meta: { name: value.name, icon: value.icon },
    //             name: value.url,
    //             // component: () => import(`../template${value.url}`),
    //           });
    //         });
    //       }
    //       router.addRoute({
    //         path: index.url,
    //         meta: { name: index.name, icon: index.icon },
    //         name: index.url,
    //         // component: () => import(`../template${value.url}`),
    //       });
    //     });
    //   }
    // });
    // router.addRoute({ path: '/:catchAll(.*)', redirect: '/404', hidden: true });
  }

  if (
    token === null ||
    to.name === 'basePage' ||
    to.name === 'detailPage' ||
    to.name === 'loginPage' ||
    to.name === '404Page' ||
    to.name === '500Page'
  ) {
    storeLayout.setShowLayout(false);
  } else {
    storeLayout.setShowLayout(true);
  }

  // 监听路由变化形成tab
  setRouteChange(to);

  if (token === null) {
    var routename = ref('');
    checkBrowser().indexOf('Chrome') < 0
      ? (routename.value = 'incompatible')
      : (routename.value = 'loginPage');
    if (to.name !== routename.value) {
      next({ name: routename.value });
    } else {
      next();
    }
  } else if (to.name === 'loginPage') {
    next('/template');
  } else {
    next();
  }
});
