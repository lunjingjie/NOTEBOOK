import Mock from 'mockjs';

Mock.mock('register', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.name && body.password && body.confirmPassword) {
    return {
      code: 200,
      message: '注册成功',
      data: 'success',
    };
  }
  return {
    code: 403,
    message: '注册失败',
  };
});

Mock.mock(RegExp('userList.*'), 'get', (options) => {
  const name = options.url.split('?')[1].split('=')[1];
  return {
    list: [
      {
        id: 1,
        name,
        password: null,
      },
    ],
  };
});

Mock.mock('amendPw', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.password) {
    return {
      code: 200,
      message: '修改密码成功',
      data: 'success',
    };
  }
  return {
    code: 403,
    message: '修改密码失败',
  };
});

Mock.mock('captcha', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.phone) {
    return {
      code: 200,
      message: '验证码已发送',
      data: '42534',
    };
  }
  return {
    code: 403,
    message: '验证码发送失败',
  };
});

Mock.mock('checkName', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.name) {
    return {
      code: 200,
      message: '账号还未注册',
      data: 'success',
    };
  }
  return {
    code: 403,
    message: '账号已注册',
  };
});
