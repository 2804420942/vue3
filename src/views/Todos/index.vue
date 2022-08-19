<template>
  <div class="todos">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col>
        <a-card title="备忘录" style="width: 800px">
          <template #cover>
            <img alt="example" src="@/assets/sendAixin.gif">
          </template>
          <template #extra><a @click.prevent="add">添加</a></template>
          <a-progress type="circle" :width="50" :percent="percent" />
          <div v-for="(item, idx) in list" :key="idx" style="margin-top: 10px">
            <a-space v-if="item.canEdit">
              <check-circle-two-tone v-if="item.isFinish" two-tone-color="#52c41a"/>
              <clock-circle-two-tone v-else />
              <a-input v-if="item.canEdit" v-model:value="item.value" style="width: 350px" :placeholder="item.placeholder" />
              <a-button type="primary" @click="sure(idx)">确定</a-button>
              <a-button @click="cancel(idx)">取消</a-button>
            </a-space>
            <a-space v-else>
              <check-circle-two-tone v-if="item.isFinish" two-tone-color="#52c41a"/>
              <clock-circle-two-tone v-else />
              <span style="display: inline-block; width: 350px">{{item.value}}</span>
              <a-button @click="edit(idx)">编辑</a-button>
              <a-button danger @click="del(idx)">删除</a-button>
              <a-button :type="item.isFinish ? '' : 'primary'" @click="finish(idx)">{{item.isFinish ? '未完成' : '已完成'}}</a-button>
            </a-space>
          </div>
        </a-card>
      </a-col>
    </a-row>
    
  </div>
</template>

<script setup lang="ts">
import { message, Modal } from 'ant-design-vue'
import { CheckCircleTwoTone, ClockCircleTwoTone } from '@ant-design/icons-vue';
import { reactive, ref, toRefs, computed, watch } from 'vue'

const local = JSON.parse(localStorage.getItem('Todos')) || {
  list: [],
  oldVal: [],
  percent: 0,
}

const state = reactive(local)

watch(state.list, (newVal) => {
  const length = newVal.length
  const finishLen = newVal.filter(item => item.isFinish).length
  state.percent = Math.floor((finishLen / length) * 100) 
}, { deep: true, immediate: true })

function add(idx) {
  const flag = state.list.length === 0 || (state.list.length > 0 && !!state.oldVal[state.list.length - 1])
  if(flag) {
    state.list.push({
      value: '',
      placeholder: '请输入代办',
      canEdit: true,
      isFinish: false
    })
  } else {
    if(!state.oldVal[state.list.length - 1]) {
      message.warning('请确认输入的代办')
      return
    }
    message.warning('请输入代办')
  }
  
}

function cancel(idx) {
  const flag = !state.oldVal[idx]
  if(flag) {
    state.list.splice(idx, 1)
  } else {
    state.list[idx].value = state.oldVal[idx]
    state.list[idx].canEdit = false
  }
}
function sure(idx) {
  const flag = state.list.length > 0 && !!state.list[state.list.length - 1].value
  if(flag) {
    state.list[idx].canEdit = false
    state.oldVal[idx] = state.list[idx].value
    localStorage.setItem('Todos', JSON.stringify(state))
  } else {
    message.warning('请输入代办')
  }
}

function edit(idx) {
  state.list[idx].canEdit = true
  state.oldVal[idx] = state.list[idx].value || ''
}

function finish(idx) {
  state.list[idx].isFinish = !state.list[idx].isFinish
  localStorage.setItem('Todos', JSON.stringify(state))
}

function del(idx) {
  Modal.confirm({
    title: '确定要删除吗？',
    okText: "提交",
    cancelText: "取消",
    onOk() {
      state.list.splice(idx, 1)
      localStorage.setItem('Todos', JSON.stringify(state))
    },
    onCancel() {
    }
  });
}

const { list, percent } = toRefs(state)
</script>

<style scoped>
</style>