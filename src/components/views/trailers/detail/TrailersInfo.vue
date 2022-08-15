<template>
  <div>
    <div class="trucks__title text-h3-SBold">Trailers Info</div>
    <div class="trucks__info">
      <TrucksInfoItem v-for="item in data_info" :title="item.title" :value="item.value"/>
    </div>
  </div>

</template>
<script>
import TrucksInfoItem from "@/components/views/trucks/detail/TrucksInfoItem";
import {computed, ref} from "vue";
import {trailer_by_id} from "@/hooks/trailer/useTrailer";
export default {
  components: {TrucksInfoItem},
  setup(){
    // const data_info = ref([]);
    const data_info = computed(()=>[
      {title:'Trailer Number', value:trailer_by_id.value?.number || '---'},
      {title:'Plate number', value:trailer_by_id.value?.plate_number || '---'},
      {title:'Make & Model', value:trailer_by_id.value?.make || '---'},
      {title:'Assigned Driver', value:trailer_by_id.value?.assigned_driver?.name || '---'},
      {title:'Model',value:trailer_by_id.value?.model || '---'},
      {title:'With Driver Since',value:trailer_by_id.value?.driver_since || '---'},
      {title:'Year Made', value:trailer_by_id.value?.year_made || '---'},
    ])

    return{data_info}
  }
}
</script>