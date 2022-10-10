<template>
  <v-loading v-if="loading"/>
  <div v-else class="section__page">
    <FilterBar v-model="searchList">
<!--      <v-btn type="outline" svg="filter">Filter</v-btn>-->
      <v-btn svg="plus" @click="trailer_modal = true, old_trailer = false" v-if="user_permissions?.some(e=>e.alias==='create_trailer')">Add Trailer</v-btn>
    </FilterBar>
    <vTable v-if="trailer_list && trailer_list.trailers"
            :count="count" :pages="pages"
            v-model:limit="limit"
            @update:limit="fetchList({type:'limit'})"
            v-model:page="page"
            @update:page="fetchList">
      <template v-slot:tool>
        <TableTool v-if="checked && checked.length > 0">
          <v-btn type="edit" size="md" @click="editTrailer()" v-if="checked.length === 1">Edit</v-btn>
<!--          <v-btn type="edit" size="md">Print All Info</v-btn>-->
<!--          <v-btn type="edit" size="md">Print Docs</v-btn>-->
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRow icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRow v-for="(i,index) in trailer_list.trailers"
                          icon="true" @click="$router.push(`/trailers/${i.id}`)"
                          v-model:check="i.checked"
                          :id="i.id + index" cursor="pointer" :key="index"
                          :col1="{name:i.number,type:'def'}"
                          :col2="{name:i.make,type:'def'}"
                          :col3="{name:i.trailer_type,type:'def'}"
                          :col4="{name:i.year_made,type:'def'}"
                          :col5="{name:i.assigned_driver.name.trim() || '--',type:'def'}"
                          :col7="{name:i.status.name.trim() || '--',type:'status',size:i.status.alias ==='full' ? 'null' : i.status.alias === 'assigned' ? 'half' : 'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded :title="trailer_modal && !old_trailer ?'Add Trailer' : 'Edit Trailer'" v-if="trailer_modal || old_trailer"
              @close="trailer_modal = old_trailer =  false, new_trailer = {}" @save="addNewTrailer">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/trailer.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="new_trailer.number" :error="v$.$dirty && v$.number.$invalid" label="Trailer number" place="Enter number"/>
      <v-input v-model="new_trailer.make" :error="v$.$dirty && v$.make.$invalid" label="Make & Model" place="Enter make"/>
      <v-input v-model="new_trailer.trailer_type" :error="v$.$dirty && v$.trailer_type.$invalid" label="Type" place="Enter type"/>
      <v-input v-model="new_trailer.year_made" :error="v$.$dirty && v$.year_made.$invalid" label="Year made" place="Enter year"/>
      <v-input v-model="new_trailer.plate_number" :error="v$.$dirty && v$.plate_number.$invalid" label="Plate number" place="Enter plate number"/>
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
import {computed, onMounted, ref, watch} from "vue";
import {all_trailers_list, createTrailer, getAllTrailersList, updateTrailerById} from "@/hooks/trailer/useTrailer";
import VLoading from "@/components/ui/vLoading";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {user_permissions} from "@/hooks/user/useUser";

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

    let trailer_modal = ref(false);
    let old_trailer = ref(false);
    let loading = ref(false);
    const new_trailer = ref({
      number:"",
      make:"",
      trailer_type:"",
      year_made:"",
      plate_number:""
    });
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (trailer_list?.value?.count) ? trailer_list.value.count : 0);
    let pages = computed(() => (trailer_list?.value?.count) ? Math.ceil(trailer_list.value.count/limit.value) : 0);
    const trailer_list = computed(()=>all_trailers_list.value)
    const checked = computed(()=>{
      return trailer_list.value?.trailers.filter(e=>e.checked===true)
    })
    const rules = {
      number: { required },
      make: { required },
      trailer_type: { required },
      year_made: { required },
      plate_number: { required },
    }
    const v$ = useVuelidate(rules, new_trailer);
    const searchList = ref("");
    watch(searchList,(a)=>{
      page.value = 1;
      getAllTrailersList({limit:limit.value,page:page.value,search:a});
    });
    async function fetchList(obj){
      loading.value = true;
      if(obj?.type==='limit') page.value = 1;
      await getAllTrailersList({limit:limit.value,page:page.value,search:searchList.value});
      loading.value = false;
    }

    onMounted(() => {
      fetchList();
    });


    async function addNewTrailer() {
      // await createTrailer(new_trailer.value);
      // new_trailer.value = {};
      // trailer_modal.value = false
      // await getAllTrailersList();


      v$.value.$touch();
      if (!v$.value.$invalid) {
        // truck.value.year_made = +truck.value.year_made;
        // truck.value.milage = +truck.value.milage;
        if (trailer_modal.value && !old_trailer.value) await createTrailer(new_trailer.value); else await updateTrailerById({
          id: new_trailer.value.id,
          data: new_trailer.value
        });
        new_trailer.value = {};
        trailer_modal.value = old_trailer.value = false;
        v$.value.$reset();
        await getAllTrailersList();
      }
    }

    function editTrailer(){
      old_trailer.value = true;
      trailer_modal.value = false;
      trailer_list.value.trailers.forEach(e=> {
        if(e.checked)new_trailer.value = e
      })
    }



    return{ page, limit, count, searchList, checked, pages, v$, user_permissions, editTrailer, old_trailer, fetchList, loading, trailer_modal, trailer_list, addNewTrailer, new_trailer }
  }

}
</script>