import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/wdp-data',
});

axiosInstance.defaults.headers.Authorization =
  '';

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(err, '网络错误');
  },
);

export default axiosInstance;
