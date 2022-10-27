<template>
  <div class="drivers__detail-tab">
    <div class="text-h4 tab-item" @click="$emit('clicks','road_test')" :class="{'active':index === 'road_test'}" >Road Test</div>
    <div class="text-h4 tab-item" @click="$emit('clicks',item.alias)" :class="{'active':index === item.alias}"  v-for="(item,i) in tabs_content" >{{ item.name }} ({{(item?.percentage * 100).toFixed(0)}}%)</div>
  </div>
</template>
<script>
export default {
  props:['index','tabs_content'],
setup(props){

}

}
</script>