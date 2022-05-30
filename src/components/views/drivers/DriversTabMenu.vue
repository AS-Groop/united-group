<template>
  <div class="drivers__detail-tab">
    <div class="text-h4 tab-item" @click="$emit('clicks',i)" :class="index === i && 'active'"  v-for="(item,i) in tabs_content" >{{ item }}</div>
  </div>
</template>
<script>
export default {
  props:['index','tabs_content'],
setup(props){

}

}
</script>