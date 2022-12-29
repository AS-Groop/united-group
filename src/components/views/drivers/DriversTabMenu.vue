<template>
  <div class="drivers__detail-tab">
    <div class="text-h4 tab-item" @click="$emit('clicks','road_test')" :class="{'active':index === 'road_test'}" >Road Test</div>
    <div class="text-h4 tab-item" @click="()=>{fetchList(item);$emit('clicks',item.alias)}" :class="{'active':index === item.alias}"  v-for="(item,i) in tabs_content" >{{ item.name }} ({{(item?.percentage * 100).toFixed(0)}}%)</div>
  </div>
</template>
<script>
import {getSteps} from "@/hooks/driver/useStep";
import router from "@/router";
import {getDriverById} from "@/hooks/driver/useDriver";

export default {
  props:['index','tabs_content'],
setup(props,ctx){
  return {
    async fetchList(item){
      await getSteps(router.currentRoute.value.params.id, item);
      await getDriverById(router.currentRoute.value.params.id);
      ctx.emit('fetch');
    }
  }
}

}
</script>