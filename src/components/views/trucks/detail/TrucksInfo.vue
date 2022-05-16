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
import {ref} from "vue";
export default {
  components: {TrucksInfoItem},
  setup(){
    const data_info = ref([]);
    data_info.value = [
      {title:'Truck Number', value:'#120'},
      {title:'Plate number', value:'077707'},
      {title:'Make', value:'Volvo'},
      {title:'Milage', value:'350,000'},
      {title:'Model', value:'VNL'},
      {title:'With Driver Since', value:'-'},
      {title:'Year Made', value:'2020'},
      {title:'Assigned Driver', value:'-'},
    ]

    return{data_info}
  }
}
</script>