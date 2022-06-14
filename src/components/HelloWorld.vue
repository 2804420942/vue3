<script setup>
import { ref, reactive } from 'vue'

const msg = ref('我变了，obj.count也会变，count却不会')
let count = ref(1)
let obj = {
  count: 10
}

const inc = function() {
  count.value ++
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <p>
    {{count}}
  </p>
  <p>
    {{obj.count}}
  </p>
  <button @click="inc">
    inc
  </button>
</template>
