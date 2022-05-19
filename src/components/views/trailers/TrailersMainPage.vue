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
        <TableHRow icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRow v-for="(i,index) in data_body"
                          icon="true" @click="$router.push(`/trailers/${index}`)"
                          :id="index" cursor="pointer"
                          :col1="{name:i.col1,type:'def'}"
                          :col2="{name:i.col2,type:'def'}"
                          :col3="{name:i.col3,type:'def'}"
                          :col4="{name:i.col4,type:'def'}"
                          :col5="{name:i.col5,type:'def'}"
                          :col6="{name:i.col6,type:'def'}"
                          :col7="{name:i.col7,type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>

  <ModalAdded title="Add Truck" v-if="new_truck" @close="new_truck = false">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/trailer.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input  label="Trailer number" place="Enter number"/>
      <v-input  label="Make & Model" place="Enter make"/>
      <v-input  label="Type" place="Enter type"/>
      <v-input  label="Year made" place="Enter year"/>
      <v-input  label="Plate number" place="Enter plate number"/>
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

export default {
  components: {VInput, ModalAdded, TableBRow, TableHRow, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      new_truck:false,
      data_head: [
        'Trailer Number',
        'Make & Model',
        'Type',
        'Year Made',
        'Assigned Driver',
        'With Driver Since',
        'Status',
      ],
      data_body: [{
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }, {
        col1: '#120',
        col2: 'Wabash',
        col3: 'Dry',
        col4: '2020',
        col5: 'Azodov Asror',
        col6: '-',
        col7: 'Active',
      }
      ]
    }
  },

}
</script>