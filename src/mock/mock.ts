import Mock from 'mockjs'

Mock.mock(/\/api\/test/, function(options: any) {
  return Mock.mock({
    status: 200,
    "list|10": [{
      "id|+1": 1234,
      "name|1": ['lisi', 'wangwu', 'zhangsan', 'xiaohong', 'xiaoli'],
      "age|1-110": 18,
      "price|200-500": 1,
      "love|1": true,
    }]
  })
});
