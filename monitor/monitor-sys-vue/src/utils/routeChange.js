import mitt from 'mitt';
import { getRawRoute } from '@/utils';
import { useMenuStore } from '@/stores/menu/index.js';
import { toRaw } from 'vue';

const emitter = mitt();

const key = Symbol();

let lastChangeTab;

export const setRouteChange = (lastChangeTab) => {
  // 获取普通路由对象
  const r = getRawRoute(lastChangeTab);
  const menuStore = useMenuStore();
  const transformArr = deepTraversal(toRaw(menuStore.menuList));
  const formatRoute = matchPath(transformArr, r.fullPath);
  if (formatRoute) {
    emitter.emit(key, formatRoute);
    lastChangeTab = formatRoute;
  } else {
    // 保存当前路由
    lastChangeTab = r;
  }
};

const deepTraversal = (data) => {
  const result = [];
  data.forEach((item) => {
    const loop = (data) => {
      result.push({
        path: data.path,
        name: data.name,
        title: data.title,
        icon: data.icon,
      });
      let child = data.children;
      if (child) {
        for (let i = 0; i < child.length; i++) {
          loop(child[i]);
        }
      }
    };
    loop(item);
  });
  return result;
};

const matchPath = (arr, fullpath) => {
  const result = arr.find((item) => item.path === fullpath);
  return result;
};

export const listenerRouteChange = (callback, immediate = true) => {
  emitter.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
};

export const removeTabChangeListener = () => {
  emitter.clear();
};
