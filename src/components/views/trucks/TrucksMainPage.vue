<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus" @click="new_truck = true">Add Truck</v-btn>
    </FilterBar>
    <vTable v-if="trucks_list && trucks_list.trucks">
      <template v-slot:tool>
        <TableTool v-if="false">
          <v-btn type="edit" size="md">Edit</v-btn>
          <v-btn type="edit" size="md">Print All Info</v-btn>
          <v-btn type="edit" size="md">Print Docs</v-btn>
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRowDrivers icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRowDrivers v-for="(i,index) in trucks_list.trucks"
                          icon="true" @click="$router.push(`/trucks/${i.id}`)"
                          :id="index" cursor="pointer"
                          :col1="{name:i.number,type:'def'}"
                          :col2="{name:i.make,type:'def'}"
                          :col4="{name:i.year_made,type:'def'}"
                          :col5="{name:i.milage,type:'def'}"
                          :col6="{name:i.assigned_driver.name.trim() || '--',type:'def'}"
                          :col8="{name:i.status.name,type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded title="Add Truck" v-if="new_truck" @close="new_truck = false" @save="addNewTruck">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/truck.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="truck.number" label="Truck number" place="Enter number"/>
      <v-input v-model="truck.make" label="Make" place="Enter make"/>
      <v-input v-model="truck.model" label="Model" place="Enter model"/>
      <v-input v-model="truck.year_made" label="Year made" place="Enter year"/>
      <v-input v-model="truck.milage" label="Milage" place="Enter milage"/>
      <v-input v-model="truck.plate_number" label="Plate number" place="Enter plate number"/>
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
import {computed, onMounted, ref} from "vue";
import {all_trucks_list, createTruck, getAllTrucksList} from "@/hooks/truck/useTruck";
import {createDriver, getDriverList} from "@/hooks/driver/useDriver";

export default {
  components: {VInput, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      data_head: [
        {name:'Truck Number'},
        {name:'Make'},
        // {name:'Model'},    /* No data received from API */
        {name:'Year Made'},
        {name:'Milage'},
        {name:'Assigned Driver'},
        // {name:'With Driver Since'},   /* No data received from API */
        {name:'Status'},
      ]
    }
  },
  setup(){
    const new_truck = ref(false);
    const truck = ref({

    });

    const trucks_list = computed(()=>all_trucks_list.value)



    onMounted(() => {
      getAllTrucksList();
    });


    async function addNewTruck() {
      truck.value.year_made = +truck.value.year_made;
      truck.value.milage = +truck.value.milage;
      await createTruck(truck.value);
      truck.value = {};
      new_truck.value = false
      await getAllTrucksList();
    }


    return {truck, new_truck, addNewTruck,trucks_list}
  }

}
</script>