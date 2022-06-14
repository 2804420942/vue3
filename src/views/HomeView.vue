<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import { defineComponent, onRenderTracked } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    onRenderTracked((event) => {
      console.log("状态跟踪组件----------->");
      console.log(event);
    });
  },
});
</script>
