import axiosInstance from '../../plugins/axios';

const Api = {
  LOGIN: 'login',
};

export const loginApi = ({ name, password }) =>
  axiosInstance.post(Api.LOGIN, {
    name,
    password,
  });

export const templateApi = () => axiosInstance.get('mockTemplate');
