<template>
  <div @click="$emit('click')" class="btn" :class="type">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:"v-btntest",
  props:{
    type:[String]
  }
}
</script>