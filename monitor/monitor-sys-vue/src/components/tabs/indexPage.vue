<template>
  <div>
    <a-tabs
      class="multi-tabs"
      :activeKey="activeKeyRef"
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      @change="handleChange"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <a-tab-pane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <div>
              <span>
                <Icon :icon="prefixIconType(item)" />
              </span>
              <span>{{ getTitle(item) }}</span>
            </div>
          </template>
        </a-tab-pane>
      </template>

      <template #rightExtra>
        extra
        <!-- <TabRedo v-if="getShowRedo" />
        <TabContent isExtra :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" /> -->
      </template>
    </a-tabs>
  </div>
</template>
<script setup name="TabPage">
  import { computed, ref, unref } from 'vue';
  import { useMultipleTabStore } from '@/stores/multipleTab/index.js';
  import { listenerRouteChange } from '@/utils/routeChange.js';
  import Icon from '@/components/Icon';
  import { useGo } from '@/hooks/web/usePage';

  const activeKeyRef = ref('');

  const tabStore = useMultipleTabStore();

  const go = useGo();

  const getTabsState = computed(() => {
    return tabStore.getTabList;
  });

  const prefixIconType = (tabItem) => {
    if (tabItem.icon) {
      return tabItem.icon;
    } else if (tabItem.path === '/dashboard') {
      return 'ant-design:home-outlined';
    } else {
      return 'ant-design:code';
    }
  };

  const getTitle = (tabItem) => {
    return tabItem.title;
  };

  // 监听路由变化
  listenerRouteChange((route) => {
    const { path, fullPath } = route;
    const p = fullPath || path;
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p;
    }
    tabStore.addTab(unref(route));
  });

  const handleChange = (activeKey) => {
    activeKeyRef.value = activeKey;
    go(activeKey, false);
  };
</script>
<style lang="scss">
  @import '@/assets/scss/constants.scss';

  $tabHeight: calc($multiple-smooth-height - 12px);
  $component-background: #fff;
  $text-color-base: #000;
  $primary-color: #1890ff;

  .multi-tabs {
    z-index: 10;
    height: $multiple-smooth-height;
    line-height: $multiple-smooth-height;
    background-color: $component-background;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  }

  .multi-tabs .ant-tabs-tab:not(.ant-tabs-tab-active) {
    border: none !important;
    background: #fff;
  }

  .multi-tabs .ant-tabs-small {
    height: $multiple-smooth-height;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav {
    height: $multiple-smooth-height;
    margin: 0;
    background-color: $component-background;
    border: 0;
    box-shadow: none;
    padding-left: 10px;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-nav-wrap {
    height: $tabHeight;
    margin-top: 12px;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab {
    /* height: 100px !important; */
    line-height: $tabHeight;
    color: $text-color-base;
    background-color: $component-background;
    transition: padding 0.3s;
    padding: 0 24px 0 30px;
    margin: 0 -14px 0 0 !important;
    mask: '~@/assets/images/mask.png';
    mask-size: 100% 100%;
    position: relative;
    z-index: 1;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab .ant-tabs-tab-btn {
    color: $text-color-base;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab .ant-tabs-tab-btn:hover {
    z-index: 2;
    padding: 0 30px 0 36px;
  }

  .multi-tabs
    .ant-tabs.ant-tabs-card
    .ant-tabs-nav
    .ant-tabs-tab
    .ant-tabs-tab-remove
    .anticon-close {
    opacity: 1;
  }

  .multi-tabs
    .ant-tabs.ant-tabs-card
    .ant-tabs-nav
    .ant-tabs-tab
    .ant-tabs-tab-remove
    .anticon-close:hover {
    color: #fff;
    background-color: #c0c4cc;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab .ant-tabs-tab-remove {
    top: 4px;
    left: 10px;
  }

  .multi-tabs
    .ant-tabs.ant-tabs-card
    .ant-tabs-nav
    .ant-tabs-tab
    .ant-tabs-tab-remove
    .anticon-close {
    position: relative;
    width: 14px;
    height: 14px;
    font-size: 13px;
    color: inherit;
    opacity: 0;
    transition: opacity 0.15s;
    vertical-align: middle;
    line-height: 10px;
    overflow: hidden;
    transform-origin: 100% 50%;
    border-radius: 100%;
  }

  .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab,
  .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab {
    border-radius: 15px 15px 0 0 !important;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab svg {
    fill: $text-color-base;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
    color: inherit;
    background-color: #dee1e6;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab-active {
    position: relative;
    /* padding: 0 30px 0 36px; */
    color: $primary-color !important;
    background: #e8f4ff;
    border: 0;
    font-weight: inherit;
    z-index: 3;
  }

  .multi-tabs .ant-tabs.ant-tabs-card .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: $primary-color;
  }

  .ant-tabs.ant-tabs-card {
    .ant-tabs-nav {
      .ant-tabs-tab-active {
        .ant-tabs-tab-remove .anticon-close {
          opacity: 1;

          svg {
            width: 0.6em;
          }
        }

        svg {
          width: inherit;
          fill: $primary-color;
        }
      }
    }

    .ant-tabs-nav > div:nth-child(1) {
      padding: 0 6px;

      .ant-tabs-tab {
        margin-right: -20px !important;
      }
    }
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    .anticon-close {
      font-size: 12px;

      svg {
        width: 0.6em;
      }
    }
  }

  .ant-tabs-extra-content {
    position: relative;
    top: 0;
    line-height: $multiple-smooth-height !important;
  }

  .ant-dropdown-trigger {
    display: inline-flex;
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    border: none !important;
    background: #fff;
  }

  .ant-tabs-small {
    height: $multiple-smooth-height;
  }

  .ant-tabs.ant-tabs-card {
    .ant-tabs-nav {
      height: $multiple-smooth-height;
      margin: 0;
      background-color: $component-background;
      border: 0;
      box-shadow: none;
      padding-left: 10px;

      .ant-tabs-nav-wrap {
        height: $tabHeight;
        margin-top: 12px;
      }

      .ant-tabs-tab {
        /* height: 100px !important; */
        line-height: $tabHeight;
        color: $text-color-base;
        background-color: $component-background;
        transition: padding 0.3s;
        padding: 0 24px 0 30px;
        margin: 0 -14px 0 0 !important;
        mask: '~@/assets/images/mask.png';
        mask-size: 100% 100%;
        position: relative;
        z-index: 1;

        .ant-tabs-tab-btn {
          color: $text-color-base;
        }

        &:hover {
          z-index: 2;
          padding: 0 30px 0 36px;

          .ant-tabs-tab-remove .anticon-close {
            opacity: 1;

            &:hover {
              color: #fff;
              background-color: #c0c4cc;
            }
          }
        }

        .ant-tabs-tab-remove {
          top: 4px;
          left: 10px;

          .anticon-close {
            position: relative;
            width: 14px;
            height: 14px;
            font-size: 13px;
            color: inherit;
            opacity: 0;
            transition: opacity 0.15s;
            vertical-align: middle;
            line-height: 10px;
            overflow: hidden;
            transform-origin: 100% 50%;
            border-radius: 100%;

            &:hover {
              svg {
                fill: #fff;
              }
            }
          }
        }
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        svg {
          fill: $text-color-base;
        }

        &:first-child {
          padding: 0 30px 0 30px !important;
        }
      }

      .ant-tabs-tab:not(.ant-tabs-tab-active) {
        &:hover {
          color: inherit;
          background-color: #dee1e6;
        }
      }

      .ant-tabs-tab-active {
        position: relative;
        padding: 0 30px 0 36px;
        color: $primary-color !important;
        background: #e8f4ff;
        border: 0;
        font-weight: inherit;
        z-index: 3;

        .ant-tabs-tab-btn {
          color: $primary-color;
        }

        .ant-tabs-tab-remove .anticon-close {
          opacity: 1;

          svg {
            width: 0.6em;
          }
        }

        svg {
          width: inherit;
          fill: $primary-color;
        }
      }
    }

    .ant-tabs-nav > div:nth-child(1) {
      padding: 0 6px;

      .ant-tabs-tab {
        margin-right: -20px !important;
      }
    }
  }

  .ant-tabs-tab:not(.ant-tabs-tab-active) {
    .anticon-close {
      font-size: 12px;

      svg {
        width: 0.6em;
      }
    }
  }

  .ant-tabs-extra-content {
    position: relative;
    top: 0;
    line-height: $multiple-smooth-height !important;
  }

  .ant-dropdown-trigger {
    display: inline-flex;
  }
</style>
