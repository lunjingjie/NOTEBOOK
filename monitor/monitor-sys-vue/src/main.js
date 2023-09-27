import { createApp } from 'vue';
import 'virtual:windi.css';
import '@purge-icons/generated';
import { createPinia } from 'pinia';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { initRouter } from '@/plugins/router';
import * as antdVueIcons from '@ant-design/icons-vue';
import '@/assets/scss/index.scss';
import '@/assets/ui.css';
import 'animate.css';
import '@/mock';

function bootstrap() {
  const app = createApp(App);

  // app.config.errorHandler = (err) => {
  //   console.log(new Error(err));
  // };
  initRouter(app);
  app.use(createPinia());
  registerIconComponent(app);
  app.use(Antd);
  app.mount('#app');
}

/**
 * 注册icon组件
 */
function registerIconComponent(app) {
  Object.keys(antdVueIcons).forEach((key) => {
    app.component(key, antdVueIcons[key]);
  });
  app.config.globalProperties.$antdVueIcons = antdVueIcons;
}

bootstrap();

const uploadError = ({ lineno, colno, error: { stack }, message, filename }) => {
  const info = {
    lineno,
    colno,
    stack,
    message,
    filename,
  };

  // 创建base64编码的字符串
  const str = window.btoa(JSON.stringify(info));
  const host = 'http://localhost:7001/monitor/error';
  new Image().src = `${host}?info=${str}`;
};

window.addEventListener(
  'error',
  (e) => {
    console.log('error', e);
    uploadError(e);
    // 如果返回true，错误就不会被上抛了
    return true;
  },
  true,
);

const getObject = (a) => {
  return a.b.c;
};

getObject({});
