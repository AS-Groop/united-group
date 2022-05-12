<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus">Add driver</v-btn>
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
                          icon="true"
                          :id="index"
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
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRowDrivers from "@/components/app/table/TableHRowDrivers";
import TableBRowDrivers from "@/components/app/table/TableBRowDrivers";

export default {
  components: {TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      data_head: [
        'Truck Number',
        'Make',
        'Model',
        'Year Made',
        'Milage',
        'Assigned Driver',
        'With Driver Since',
        'Status',
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
  }
}
</script>