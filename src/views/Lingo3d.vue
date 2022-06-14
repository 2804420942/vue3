<template>
  <div class="lingo3d">
    <Skybox texture="sky.webp"/>
    <World>
      <Cube :width="9999" :depth="9999" :y="-100" @click="handleClick" texture="ground.webp" :textureRepeat="20" color="green"/>
      <Model
        ref="modelRef"
        src="girl.fbx"
      />
      <OrbitCamera active :z="300"/>
      
    </World>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { World, Cube, Model, OrbitCamera, Skybox } from 'lingo3d-vue'

const handleClick = (event) => {

}

let position = reactive({x: 0, y: 0, z: 0})

</script>

<style scoped>
  .lingo3d {
    width: 100%;
    height: 850px;
    position: relative;
  }
</style>