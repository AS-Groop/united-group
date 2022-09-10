<template>

  <v-table
  v-if="all_users_list?.users"
  :pages="pages" :count="count"
  v-model:limit="limit"
  @update:limit="fetchList({type:'limit'})"
  v-model:page="page"
  @update:page="fetchList"
  >
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
    <template v-if="all_users_list?.users" v-slot:body-row>
      <TableBRow v-for="(i,index) in all_users_list.users"
                 icon="true"
                 :id="index" cursor="pointer"
                 :col2="{name:i.phone || '--',type:'def'}"
                 :col3="{name:i.role?.name || '--',type:'def'}"
      >
        <template v-slot:start>
          <td>
            <div class="table__user">
              <div class="img me-15">
                <img src="@/assets/images/img2.png" alt="">
              </div>
              <div>
                <div class="text-h6 text-gray2">{{i.first_name || ''}}  {{i.last_name || '--'}}</div>
                <div class="text-h7 text-gray3">{{i.username || '--'}}</div>
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
            <v-svg class="mx-1 me-15" @click="$emit('delete',i.id)"  id="remove-table" width="32" height="26"/>
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
import {all_users_list, getAllUserList} from "@/hooks/user/useUser";
import {computed, ref} from "vue";

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
    let page = ref(1);
    let limit = ref(10);
    const count = computed(()=>all_users_list?.value?.count || 0);
    const pages = computed(()=>all_users_list?.value?.count? Math.ceil(all_users_list.value.count/limit.value) : 0);
    function fetchList(obj){
      if(obj?.type==='limit') page.value = 1
      getAllUserList({limit:limit.value,page:page.value})
    }
    return {data_head, data_body, fetchList, page, limit, all_users_list, count, pages}

  }

}
</script>