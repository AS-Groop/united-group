<template>
  <div>
    <div class="trucks__title text-h3-SBold">Truck Info</div>
    <div class="trucks__info">
      <TrucksInfoItem v-for="item in data_info" :title="item.title" :value="item.value"/>
    </div>
  </div>

</template>
<script>
import TrucksInfoItem from "@/components/views/trucks/detail/TrucksInfoItem";
import {computed, ref} from "vue";
import {truck_by_id} from "@/hooks/truck/useTruck";
import {truck_history_inspect_id} from "@/hooks/truck/useTruckHistory";
export default {
  components: {TrucksInfoItem},
  setup(){
    const data_info =computed(()=> [
      {title:'Truck Number', value: truck_history_inspect_id.value?.truck.number || '--'},
      {title:'Plate number', value:truck_history_inspect_id.value?.truck.plate_number || '--'},
      {title:'Make', value:truck_history_inspect_id.value?.truck.make || '--'},
      {title:'Milage', value:truck_history_inspect_id.value?.truck.milage || '--'},
      {title:'Model', value:truck_history_inspect_id.value?.truck.model || '--'},
      {title:'With Driver Since', value:truck_history_inspect_id.value?.truck.driver_since || '--'},
      {title:'Year Made', value:truck_history_inspect_id.value?.truck.year_made || '--'},
      {title:'Assigned Driver', value:truck_history_inspect_id.value?.truck.assigned_driver?.name.trim() || '--'},
    ])

    return{data_info}
  }
}
</script>