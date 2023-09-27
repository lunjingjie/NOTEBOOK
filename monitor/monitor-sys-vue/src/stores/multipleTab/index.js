import { defineStore } from 'pinia';
import { getRawRoute } from '@/utils';
import { toRaw } from 'vue';

export const useMultipleTabStore = defineStore({
  id: 'multipleTab',
  state: () => ({
    cacheTabList: new Set(),
    tabList: [],
  }),
  getters: {
    getTabList() {
      return this.tabList;
    },
    getCachedTabList() {
      return Array.from(this.cacheTabList);
    },
  },
  actions: {
    updateCacheTab() {
      const cacheMap = new Set();
      for (const tab of this.tabList) {
        const item = getRawRoute(tab);
        const needCache = true;
        if (!needCache) {
          continue;
        }
        const name = item.name;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
    },
    addTab(route) {
      const { fullPath, path, params, query } = getRawRoute(route);
      let updateIndex = -1;
      const tabHasExist = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });

      if (tabHasExist) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.tabList.splice(updateIndex, 1, curTab);
      } else {
        this.tabList.push(route);
      }
      this.updateCacheTab();
    },
  },
});
