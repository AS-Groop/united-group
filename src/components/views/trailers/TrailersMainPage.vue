<template>
  <v-loading v-if="loading"/>
  <div v-else class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus" @click="trailer_modal = true">Add Trailer</v-btn>
    </FilterBar>
    <vTable v-if="trailer_list && trailer_list.trailers"
            :count="count" :pages="pages"
            v-model:limit="limit"
            @update:limit="fetchList({type:'limit'})"
            v-model:page="page"
            @update:page="fetchList">
      <template v-slot:tool>
        <TableTool v-if="false">
          <v-btn type="edit" size="md">Edit</v-btn>
          <v-btn type="edit" size="md">Print All Info</v-btn>
          <v-btn type="edit" size="md">Print Docs</v-btn>
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRow icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRow v-for="(i) in trailer_list.trailers"
                          icon="true" @click="$router.push(`/trailers/${id}`)"
                          :id="i.id" cursor="pointer" :key="i.id"
                          :col1="{name:i.number,type:'def'}"
                          :col2="{name:i.make,type:'def'}"
                          :col3="{name:i.trailer_type,type:'def'}"
                          :col4="{name:i.year_made,type:'def'}"
                          :col5="{name:i.assigned_driver.name.trim() || '--',type:'def'}"
                          :col7="{name:i.status.name.trim() || '--',type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded title="Add Trailer" v-if="trailer_modal" @close="trailer_modal = false" @save="addNewTrailer">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/trailer.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="new_trailer.number" label="Trailer number" place="Enter number"/>
      <v-input v-model="new_trailer.make" label="Make & Model" place="Enter make"/>
      <v-input v-model="new_trailer.trailer_type" label="Type" place="Enter type"/>
      <v-input v-model="new_trailer.year_made" label="Year made" place="Enter year"/>
      <v-input v-model="new_trailer.plate_number" label="Plate number" place="Enter plate number"/>
    </template>
  </ModalAdded>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRow from "@/components/app/table/TableHRow";
import TableBRow from "@/components/app/table/TableBRow";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import {computed, onMounted, ref} from "vue";
import {all_trailers_list, createTrailer, getAllTrailersList} from "@/hooks/trailer/useTrailer";
import VLoading from "@/components/ui/vLoading";

export default {
  components: {VLoading, VInput, ModalAdded, TableBRow, TableHRow, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      data_head: [
        {name:'Trailer Number'},
        {name:'Make & Model'},
        {name:'Type'},
        {name:'Year Made'},
        {name:'Assigned Driver'},
        // {name:'With Driver Since'}, /* No data received from API */
        {name:'Status'},
      ]
    }
  },
  setup(){

    let trailer_modal = ref(false)
    let loading = ref(false)
    const new_trailer = ref({});
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (trailer_list?.value?.count) ? trailer_list.value.count : 0);
    let pages = computed(() => (trailer_list?.value?.count) ? Math.ceil(trailer_list.value.count/limit.value) : 0);

    const trailer_list = computed(()=>all_trailers_list.value)

    async function fetchList(obj){
      loading.value = true;
      if(obj?.type==='limit') page.value = 1;
      await getAllTrailersList({limit:limit.value,page:page.value});
      loading.value = false;
    }

    onMounted(() => {
      fetchList();
    });


    async function addNewTrailer() {
      await createTrailer(new_trailer.value);
      new_trailer.value = {};
      trailer_modal.value = false
      await getAllTrailersList();
    }


    return{ page, limit, count, pages, fetchList, loading, trailer_modal, trailer_list, addNewTrailer, new_trailer }
  }

}
</script>