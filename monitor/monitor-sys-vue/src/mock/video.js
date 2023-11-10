import Mock from 'mockjs';

Mock.mock('video', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.id) {
    return {
      code: 200,
      data: [
        {
          id: '1',
          url: 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
        },
        {
          id: '2',
          url: 'https://sample-videos.com/video123/flv/720/big_buck_bunny_720p_2mb.flv',
        },
      ],
    };
  }
  return {
    code: 403,
    message: '视频获取失败',
  };
});

Mock.mock('startcontrol', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.id && body.url) {
    return {
      code: 200,
      data: [],
      message: '远程控制成功',
    };
  }
  return {
    code: 403,
    message: '远程控制失败',
  };
});

Mock.mock('stopcontrol', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.id && body.url) {
    return {
      code: 200,
      data: [],
      message: '取消控制成功',
    };
  }
  return {
    code: 403,
    message: '远程控制失败',
  };
});

Mock.mock('touchlive', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.id && body.url && body.id) {
    return {
      code: 200,
      data: [],
      message: '设备在线',
    };
  }
  return {
    code: 403,
    message: '设备不在线',
  };
});
