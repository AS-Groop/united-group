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
export default {
  components: {TrucksInfoItem},
  setup(){
    const data_info =computed(()=> [
      {title:'Truck Number', value: truck_by_id.value?.number || '--'},
      {title:'Attached Trailer', value:truck_by_id.value?.assigned_trailer?.number || '--'},
      {title:'Make', value:truck_by_id.value?.make || '--'},
      {title:'Milage', value:truck_by_id.value?.milage || '--'},
      {title:'Model', value:truck_by_id.value?.model || '--'},
      {title:'With Driver Since', value:truck_by_id.value?.assigned_driver?.since || '--'},
      {title:'Year Made', value:truck_by_id.value?.year_made || '--'},
      {title:'Assigned Driver', value:truck_by_id.value?.assigned_driver?.name.trim() || '--'},
    ])

    return{data_info}
  }
}
</script>