import Mock from 'mockjs';

Mock.mock('login', 'post', (options) => {
  const body = JSON.parse(options.body);
  if (body.name && body.password) {
    return {
      code: 200,
      data: 'mocktoken',
    };
  }
  return {
    code: 403,
    message: '账号或密码错误',
  };
});
