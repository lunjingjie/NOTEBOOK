import axios from 'axios';
// import { useLoginStore } from '../../stores/login';
import { message as Message } from 'ant-design-vue';

const axiosInstance = axios.create({
  // baseURL: 'api',
  timeout: '600000',
});

axiosInstance.interceptors.response.use(
  (res) => {
    if (
      typeof res.data === 'object' &&
      res.data.code &&
      res.data.code !== 0 &&
      res.data.code !== 200 &&
      res.data.code !== 100
    ) {
      console.error(`code:${res.data.code},${res.data.message},url:${res.config.url}`);
      throw new Error(`code:${res.data.code},${res.data.message},url:${res.config.url}`);
    } else {
      return res;
    }
  },
  (err) => {
    if (err.response) {
      if (err.response.status === 403) {
        Message.warning('当前权限拒绝访问，请重新登录！');
      } else {
        Message.warning('响应出错，请稍后重试！');
      }
      return Promise.reject(err);
    }
  },
);

export const setTokenInHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

export function deleteTokenInHeader() {
  delete axiosInstance.defaults.headers.common.Authorization;
}

export default axiosInstance;
