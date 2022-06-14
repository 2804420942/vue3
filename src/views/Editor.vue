<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, onUpdated } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: "EditorA",
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref("")

    const toolbarConfig = {
      toolbarKeys: [
        // 菜单 key
        'header2',

        // 分割线
        '|',

        // 菜单 key
        'bold', '|','italic','|','underline','|','through','|','insertLink','|','editLink','|',"insertImage"

      ],
    };
    // 自定义校验链接
    function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
        if (!url) {
            return
        }
        if (url.indexOf('http') !== 0) {
            return '链接必须以 http/https 开头'
        }
        return true

        // 返回值有三种选择：
        // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
        // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
        // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    }

    // 自定义转换链接 url
    function customParseLinkUrl(url: string): string {
        if (url.indexOf('http') !== 0) {
            return `http://${url}`
        }
        return url
    }
    const editorConfig = { placeholder: "请输入内容...", MENU_CONF: { insertLink: {}, editLink: {} } }

    // 插入链接
    editorConfig.MENU_CONF['insertLink'] = {
        checkLink: customCheckLinkFn, // 也支持 async 函数
        parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
    }
    // 更新链接
    editorConfig.MENU_CONF['editLink'] = {
        checkLink: customCheckLinkFn, // 也支持 async 函数
        parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
    }

    onUpdated(() => {
      console.log(valueHtml.value);
    })

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor: any) => {
        editorRef.value = editor
        console.log('created', editor.getAllMenuKeys())
    }
    


    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
    };
  },
};
</script>

<style scoped></style>
