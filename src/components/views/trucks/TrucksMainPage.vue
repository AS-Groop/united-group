<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus" @click="new_truck = true">Add Truck</v-btn>
    </FilterBar>
    <vTable>
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
        <TableBRowDrivers v-for="(i,index) in data_body"
                          icon="true" @click="$router.push(`/trucks/${index}`)"
                          :id="index" cursor="pointer"
                          :col1="{name:i.col1,type:'def'}"
                          :col2="{name:i.col2,type:'def'}"
                          :col3="{name:i.col3,type:'def'}"
                          :col4="{name:i.col4,type:'def'}"
                          :col5="{name:i.col5,type:'def'}"
                          :col6="{name:i.col7,type:'def'}"
                          :col7="{name:i.col7,type:'def'}"
                          :col8="{name:i.col8,type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded title="Add Truck" v-if="new_truck" @close="new_truck = false">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/truck.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input  label="Truck number" place="Enter number"/>
      <v-input  label="Make" place="Enter make"/>
      <v-input  label="Model" place="Enter model"/>
      <v-input  label="Year made" place="Enter year"/>
      <v-input  label="Milage" place="Enter milage"/>
      <v-input  label="Plate number" place="Enter plate number"/>
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

export default {
  components: {VInput, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      new_truck:false,
      data_head: [
        {name:'Truck Number'},
        {name:'Make'},
        {name:'Model'},
        {name:'Year Made'},
        {name:'Milage'},
        {name:'Assigned Driver'},
        {name:'With Driver Since'},
        {name:'Status'},
      ],
      data_body: [{
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }, {
        col1: '#120',
        col2: 'Volvo',
        col3: 'VNL',
        col4: '2020',
        col5: '350,000',
        col6: '-',
        col7: '-',
        col8: 'Active',
      }
      ]
    }
  },

}
</script>