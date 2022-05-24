<template>
  <div class="cars__content-history">
    <div class="d-flex  my-15 align-center justify-center">
      <div class="history__btn d-flex align-center text-h2" :class="history ? 'active' : ''" @click="history = !history">
        <v-svg id="history-time" width="27" height="27"/>
        History
        <v-svg class-name="arr" id="history-arr" width="27" height="27"/>
      </div>
    </div>
    <div class="history__items" v-if="history">
      <CarsHistoryItem v-for="i in 6"/>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import CarsHistoryItem from "@/components/views/cars/CarsHistoryItem";
import {ref} from "vue";
export default {
  components: {CarsHistoryItem, VSvg},
  setup(){
    const history = ref(false);
    return {history}
  }
}
</script>