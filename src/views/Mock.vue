<template>
  <div class="mock">
    <a-table :dataSource="list" :columns="columns" bordered rowKey="id">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-if="column.key === 'love'">
          {{ record.love ? '是' : '否' }}
        </template>
      </template>
    </a-table>
    
    <a-list item-layout="vertical" size="large" :data-source="news">
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #extra>
            <img
              width="272"
              alt="logo"
              :src="item.pic"
            />
          </template>
          <a-list-item-meta>
            <template #title>
              <a :href="item.url">{{ item.title }}</a>
            </template>
          </a-list-item-meta>
          <span v-html="item.content"></span>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts" setup>
// category: "sports"
// content: "<p class=\"art_p\">有关莱万转会的肥皂剧在继续，据外媒报道，拜仁要求巴萨一次性支付5000万欧元，否则他们不会出售莱万，而是让波兰人留在拜仁再踢一个赛季。</p>\n<p class=\"art_p\">西班牙加泰罗尼亚电台报道，在莱万转会的问题上，拜仁态度依然强硬，他们给莱万的转会设置了一个明确的价格，那就是5000万欧元。而此前巴萨只报出了3000万欧元的价格。</p>\n<p class=\"art_p\">虽然莱万已经33岁，而且合同只剩下1年，但拜仁不会轻易让他走人，他们要求巴萨支付5000万欧元，而且必须一次性支付，拒绝分期。</p>\n<div sax-type=\"proxy\" class=\"j_native_stu220614 box\" style=\"margin:20px 0\"></div><p class=\"art_p\">另外据德国天空电视台记者普莱滕伯格透露，拜仁可能会强行留住莱万。</p>\n<p class=\"art_p\">普莱滕伯格表示：“我非常确定，莱万下赛季还会在拜仁踢球。他肯定希望离开，也为此做了很多工作，但我相信拜仁会强留他。”</p>\n<p class=\"art_p\">（伊万）</p>"
// pic: "https://n.sinaimg.cn/sports/transform/280/w650h430/20220614/7a2a-5011d2ae3435868e4e6a2f08e61748b0.jpg"
// src: "新浪体育"
// time: "2022-06-14 07:31:00"
// title: "曝拜仁要求巴萨一次性支付5000万   否则将强留莱万"
// url: "https://sports.sina.cn/bundesliga/germany/2022-06-14/detail-imizmscu6680692.d.html?vt=4&pos=108"
// weburl: "https://sports.sina.com.cn/global/germany/2022-06
import { reactive, toRefs } from 'vue'
import axios from '@/api/axios'



const state = reactive({
  list: [],
  news: [],
  columns: [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '女朋友',
      dataIndex: 'love',
      key: 'love',
    },
  ]
})


function getData() {
  axios.mockData('/api/test').then((res: any) => {
    if(res.status === 200) {
      state.list = res.list || []
    }
    console.log(res)
  })
  axios.getData('/news/?channel=头条&start=0&num=10&appkey=4a3e2f884b57a0ba').then((res: any) => {
    if(res.msg === 'ok') {
      state.news = res.result?.list || []
    }
    console.log(state.news)
  })
}

getData();

const { list, columns, news } = toRefs(state);

</script>

<style scoped>
.mock {
  padding: 20px;
}
</style>