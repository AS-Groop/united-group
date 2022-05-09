<template>
  <div @click="$emit('click')" class="btn" :class="['btn-'+type, 'btn-'+size]">
    <div class="btn-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:"v-btn",
  props:{
    type:[String],
    size: {
      type: String,
      default :'lg'
    },
  }
}
</script>