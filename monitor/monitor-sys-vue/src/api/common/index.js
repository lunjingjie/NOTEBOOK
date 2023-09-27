import axiosInstance from '@/plugins/axios';

const Api = {
  DOWNLOAD: 'downloadFile',
  UPLOAD: 'uploadFile',
};

// 文件上传
export const uploadApi = (param) => {
  const formData = new FormData();
  formData.append('file', param);
  return axiosInstance({
    url: Api.UPLOAD,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'post',
  });
};

// 文件下载
export const downloadApi = (params) => {
  return axiosInstance({
    url: Api.DOWNLOAD,
    data: params,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    responseType: 'blob',
  });
};
