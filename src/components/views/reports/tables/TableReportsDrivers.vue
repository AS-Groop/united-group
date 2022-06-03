<template>

  <v-table>
    <template v-slot:tool>
      <TableTool v-if="false" class="bt-0">
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
                 icon="true"
                 :id="index" cursor="pointer"
                 :col1="{name:i.col1,type:'def'}"
                 :col2="{name:i.col2,type:'def'}"
                 :col3="{name:i.col3,type:'def'}"
                 :col4="{name:i.col4,type:'def'}"
                 :col5="{name:i.col5,type:'def'}"
                 :col7="{name:i.col7,type:'def',}"
      >
        <td>
          <v-svg class="mx-1" id="download-table" width="32" height="26"/>
          <v-svg class="mx-1" @click="$router.push(`/reports/${i.id}/drivers`)" id="edit-table" width="32" height="26"/>
          <v-svg class="mx-1" id="remove-table" width="32" height="26"/>
        </td>
      </TableBRow>
    </template>
  </v-table>
</template>
<script>
import VTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import VBtn from "@/components/ui/vBtn";
import TableHRow from "@/components/app/table/TableHRow";
import TableBRow from "@/components/app/table/TableBRow";
import {ref} from "vue";
import VSvg from "@/components/ui/vSvg";

export default {
  components: {VSvg, TableBRow, TableHRow, VBtn, TableTool, VTable},
  setup() {
    let data_head = null;
    let data_body = null;
    data_head = [
      {name:'Driver Name'},
      {name:'Email'},
      {name:'Phone number'},
      {name:'Assigned Truck'},
      {name:'Assigned Trailer'},
      {name:'Date Created'},
      {class:'w-150',name:'Actions'}
    ];
    data_body = [
      {
        id:1,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:2,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:3,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:4,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:5,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:6,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      },{
        id:7,
        col1: 'Ahmad Zokir',
        col2: 'ahmadz@gmail.com',
        col3: '+ 1 717 777 0707',
        col4: '120',
        col5: '596',
        col7: '05/25/2022 11:24'
      }
    ];
    return {data_head, data_body}

  }

}
</script>