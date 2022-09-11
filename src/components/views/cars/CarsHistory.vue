<template>
  <div class="cars__content-history">
    <div class="d-flex  my-15 align-center justify-center">
      <div class="history__btn d-flex align-center text-h2" :class="history ? 'active' : ''" @click="history = !history">
        <v-svg id="history-time" width="27" height="27"/>
        History
        <v-svg class-name="arr" id="history-arr" width="27" height="27"/>
      </div>
    </div>
    <div class="history__items" v-if="history && car_history_id?.history">
      <CarsHistoryItem :item="i" v-for="i in car_history_id.history"/>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import CarsHistoryItem from "@/components/views/cars/CarsHistoryItem";
import {onMounted, ref, watch} from "vue";
import {car_history_id, getCarHistory, getPickDropCar, pickDropCar} from "@/hooks/car/useCar";
export default {
  props:['id'],
  components: {CarsHistoryItem, VSvg},
  setup(props){
    const history = ref(false);
    return {history, car_history_id}
  }
}
</script>