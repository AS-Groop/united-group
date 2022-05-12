<template>
  <div class="drivers__detail-tab">
    <div class="text-h4 tab-item" @click="$emit('clicks',i)" :class="index === i && 'active'"  v-for="(item,i) in tabs_content" >{{ item }}</div>
  </div>
</template>
<script>
export default {
  props:['index'],
setup(props){
  const tabs_content = ['HR (15%)', 'Sefety(35%)', 'Dispach Orentation (65%)', 'Fleet (92%)'];
  return {tabs_content}
}

}
</script>