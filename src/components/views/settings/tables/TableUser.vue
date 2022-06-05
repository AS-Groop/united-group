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
                 :col2="{name:i.col2,type:'def'}"
                 :col3="{name:i.col3,type:'def'}"
      >
        <template v-slot:start>
          <td>
            <div class="table__user">
              <div class="img me-15">
                <img src="@/assets/images/img2.png" alt="">
              </div>
              <div>
                <div class="text-h6 text-gray2">{{i.col1}}</div>
                <div class="text-h7 text-gray3">{{i.col4}}</div>
              </div>
            </div>
          </td>
        </template>
        <template v-slot:end>
          <td>
            <div>
              <v-toggle :id="i.id"/>
            </div>
          </td>
          <td class="w-150 text-end">
            <v-svg class="mx-1" @click="$emit('editUser',i)" id="edit-table" width="32"
                   height="26"/>
            <v-svg class="mx-1 me-15" @click="$emit('delete')"  id="remove-table" width="32" height="26"/>
          </td>
        </template>
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
// import {ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import vToggle from "@/components/ui/vToggle";

export default {
  components: {VSvg, vToggle, TableBRow, TableHRow, VBtn, TableTool, VTable},
  setup() {
    let data_head = null;
    let data_body = null;
    data_head = [
      {name: 'User Info'},
      {name: 'Phone Number'},
      {name: 'Role'},
      {name: 'Status'},
      {class: 'w-150', name: ' '}
    ];
    data_body = [
      {
        id: 1,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 2,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 3,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 4,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 5,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 6,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }, {
        id: 7,
        col1: 'Ahmad Zokir',
        col2: '+ 1 717 777 0707',
        col3: 'Admin',
        col4: 'example@mail.ru',
      }
    ];
    return {data_head, data_body}

  }

}
</script>