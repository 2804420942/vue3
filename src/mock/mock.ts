import Mock from 'mockjs'
import qs from 'qs'

Mock.mock(/\/api\/test/, function(options: any) {
  let str = options.url.slice(options.url.indexOf("?") + 1);
  let elem = qs.parse(str);
  return Mock.mock({
    name: elem.name,
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
