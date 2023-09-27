import Mock from 'mockjs';

Mock.mock('mockTemplate', 'get', {
  'list|1-10': [
    {
      'id|+1': 1,
    },
  ],
});
