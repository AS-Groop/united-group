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
import {trailer_history_inspect_id} from "@/hooks/trailer/useTrailerHistory";
export default {
  components: {TrucksInfoItem},
  setup(){
    const data_info =computed(()=> [
      {title:'Truck Number', value: trailer_history_inspect_id.value?.trailer.number || '--'},
      {title:'Plate number', value:trailer_history_inspect_id.value?.trailer.plate_number || '--'},
      {title:'Make', value:trailer_history_inspect_id.value?.trailer.make || '--'},
      {title:'Milage', value:trailer_history_inspect_id.value?.trailer.milage || '--'},
      {title:'Model', value:trailer_history_inspect_id.value?.trailer.model || '--'},
      {title:'With Driver Since', value:trailer_history_inspect_id.value?.trailer.driver_since || '--'},
      {title:'Year Made', value:trailer_history_inspect_id.value?.trailer.year_made || '--'},
      {title:'Assigned Driver', value:trailer_history_inspect_id.value?.trailer.assigned_driver?.name.trim() || '--'},
    ])

    return{data_info}
  }
}
</script>