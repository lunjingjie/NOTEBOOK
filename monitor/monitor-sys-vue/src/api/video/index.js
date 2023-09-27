import axiosInstance from '../../plugins/axios';

const Api = {
  VIDEO: 'video',
  STARTCONTROL: 'startcontrol',
  STOPCONTROL: 'stopcontrol',
  TOUCHLIVE: 'touchlive',
};
//获取视频数据
export const videoApi = (id) => {
  return axiosInstance.post(Api.VIDEO, {
    id,
  });
};

//开始控制摄像头
export const cameraStartControl = ({ id, url }) => {
  return axiosInstance.post(Api.STARTCONTROL, {
    id,
    url,
  });
};

//停止控制摄像头
export const cameraStopControl = ({ id, url }) => {
  return axiosInstance.post(Api.STOPCONTROL, {
    id,
    url,
  });
};

//直播心跳保活接口
export const touchLiveVideo = ({ id, url, t }) => {
  return axiosInstance.post(Api.TOUCHLIVE, {
    id,
    url,
    t,
  });
};
