<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus">Add driver</v-btn>
    </FilterBar>
    <vTable>
      <template v-slot:tool>
        <TableTool >
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
                          :col3="{name:i.col3,type:'progress',size:'full'}"
                          :col4="{name:i.col4,type:'progress',size:'half'}"
                          :col5="{name:i.col5,type:'progress',size:'null'}"
                          :col6="{name:i.col6,type:'progress',size:'null'}"
                          :col7="{name:i.col7,type:'def'}"
                          :col8="{name:i.col8,type:'def'}"
                          :col9="{name:i.col9,type:'status',size:'full'}"
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
  data(){
    return {
      data_head:[
        'Driver Name',
        'Date On Board',
        'Human Resources',
        'Safety',
        'Dispatch Orientation',
        'Fleet',
        'Assigned Truck',
        'Assigned Trailer',
        'Status',
      ],
      data_body:[{
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }
        ,{
          col1: 'Ahmad Zakirov',
          col2: '12.02.2022',
          col3: '100%',
          col4: '35%',
          col5: '0%',
          col6: '0%',
          col7: '-',
          col8: '-',
          col9: 'Active',}]
    }
  }
}
</script>