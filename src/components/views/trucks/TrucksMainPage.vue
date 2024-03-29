<template>
  <vLoading v-if="loading"/>
  <div v-else class="section__page">
    <FilterBar  v-model="searchList">
      <!--      <v-btn type="outline" svg="filter">Filter</v-btn>-->
      <v-btn svg="plus" @click="new_truck = true, old_truck = false" v-if="user_permissions?.some(e=>e.alias==='get_all_truck')">Add Truck</v-btn>
    </FilterBar>
    <vTable v-if="trucks_list && trucks_list.trucks"
            :count="count" :pages="pages"
            v-model:limit="limit"
            @update:limit="fetchList({type:'limit'})"
            v-model:page="page"
            @update:page="fetchList">
      <template v-slot:tool>
        <TableTool v-if="checked && checked.length > 0">
          <v-btn type="edit" size="md" @click="editTruck()" v-if="checked.length === 1">Edit</v-btn>
<!--          <v-btn type="edit" size="md">Print All Info</v-btn>-->
<!--          <v-btn type="edit" size="md">Print Docs</v-btn>-->
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRowDrivers icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRowDrivers v-for="(i,index) in trucks_list.trucks"
                          icon="true" @click="$router.push(`/trucks/${i.id}`)"
                          :id="index" cursor="pointer" v-model:check="i.checked"
                          :col1="{name:i.number,type:'def'}"
                          :col2="{name:i.make,type:'def'}"
                          :col4="{name:i.year_made,type:'def'}"
                          :col5="{name:i.milage,type:'def'}"
                          :col6="{name:i.assigned_driver.name.trim() || '--',type:'def'}"
                          :col8="{name:i.status.name,type:'status',size:i.status.alias ==='full' ? 'null' : i.status.alias === 'assigned' ? 'half' : 'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded :title="new_truck && !old_truck ?'Add Truck' : 'Edit Truck'" v-if="new_truck || old_truck"
              @close="new_truck = old_truck = false, truck={}" @save="addNewTruck">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/truck.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="truck.number" :error="v$.$dirty && v$.number.$invalid" label="Truck number" place="Enter number"/>
      <v-input v-model="truck.make" :error="v$.$dirty && v$.make.$invalid" label="Make" place="Enter make"/>
      <v-input v-model="truck.model" :error="v$.$dirty && v$.model.$invalid" label="Model" place="Enter model"/>
      <v-input v-model="truck.year_made" :error="v$.$dirty && v$.year_made.$invalid" label="Year made" place="Enter year"/>
      <v-input v-model="truck.milage" :error="v$.$dirty && v$.milage.$invalid" label="Milage" place="Enter milage"/>
      <v-input v-model="truck.plate_number" :error="v$.$dirty && v$.plate_number.$invalid" label="Plate number" place="Enter plate number"/>
    </template>
  </ModalAdded>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRowDrivers from "@/components/app/table/TableHRow";
import TableBRowDrivers from "@/components/app/table/TableBRow";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import vLoading from "@/components/ui/vLoading"
import {computed, onMounted, ref, watch} from "vue";
import {all_trucks_list, createTruck, getAllTrucksList, updateTruckById} from "@/hooks/truck/useTruck";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import {user_permissions} from "@/hooks/user/useUser";

export default {
  components: {VInput, vLoading, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      data_head: [
        {name: 'Truck Number'},
        {name: 'Make'},
        // {name:'Model'},    /* No data received from API */
        {name: 'Year Made'},
        {name: 'Milage'},
        {name: 'Assigned Driver'},
        // {name:'With Driver Since'},   /* No data received from API */
        {name: 'Status'},
      ]
    }
  },
  setup() {
    let loading = ref(false)
    const new_truck = ref(false);
    const old_truck = ref(false);
    const truck = ref({
      number : "",
      make : "",
      model : "",
      year_made : "",
      milage : "",
      plate_number : ""
    });
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (trucks_list?.value?.count) ? trucks_list.value.count : 0);
    let pages = computed(() => (trucks_list?.value?.count) ? Math.ceil(trucks_list.value.count / limit.value) : 0);

    const trucks_list = computed(() => all_trucks_list.value || null)
    const checked = computed(() => {
      return trucks_list.value?.trucks.filter(e => e.checked === true)
    })
    const rules = {
      number: { required },
      make: { required },
      model: { required },
      year_made: { required },
      milage: { required },
      plate_number: { required }
    }
    const v$ = useVuelidate(rules, truck);
    const searchList = ref("");
    watch(searchList,(a)=>{
      page.value = 1;
      getAllTrucksList({limit:limit.value,page:page.value,search:a});
    });
    async function fetchList(obj) {
      loading.value = true;
      if (obj?.type === 'limit') page.value = 1;
      await getAllTrucksList({limit: limit.value, page: page.value});
      loading.value = false;
    }

    function editTruck() {
      old_truck.value = true;
      new_truck.value = false;
      trucks_list.value.trucks.forEach(e=> {
        if(e.checked)truck.value = e
      })
    }

    onMounted(() => {
      fetchList();
    });


    async function addNewTruck() {

      v$.value.$touch();
      if (!v$.value.$invalid) {
        truck.value.year_made = +truck.value.year_made;
        truck.value.milage = +truck.value.milage;
        if (new_truck.value && !old_truck.value) await createTruck(truck.value); else await updateTruckById({
          id: truck.value.id,
          data: truck.value
        });
        truck.value = {};
        new_truck.value = old_truck.value = false;
        v$.value.$reset();
        await getAllTrucksList();
      }
    }


    return {
      truck,
      searchList,
      new_truck,
      checked,
      old_truck,
      editTruck,
      fetchList,
      addNewTruck,
      trucks_list,
      loading,
      page,
      v$, user_permissions,
      count,
      limit,
      pages
    }
  }

}
</script>