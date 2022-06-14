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
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import axios from '@/api/axios'



const state = reactive({
  list: [],
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
    console.log(state.list)
  })
}

getData();

const { list, columns } = toRefs(state);

</script>

<style scoped>
.mock {
  padding: 20px;
}
</style>