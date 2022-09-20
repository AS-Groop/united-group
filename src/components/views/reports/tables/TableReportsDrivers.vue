<template>

  <v-table v-if="driver_list?.drivers"
  :pages="pages" :count="count"
  v-model:limit="limit"
  @update:limit="fetchList({type:'limit'})"
  v-model:page="page"
  @update:page="fetchList">
<!--    <template v-slot:tool>-->
<!--      <TableTool v-if="false" class="bt-0">-->
<!--        <v-btn type="edit" size="md">Edit</v-btn>-->
<!--        <v-btn type="edit" size="md">Print All Info</v-btn>-->
<!--        <v-btn type="edit" size="md">Print Docs</v-btn>-->
<!--      </TableTool>-->
<!--    </template>-->
    <template v-slot:head-row>
      <TableHRow icon="true" :data="data_head"/>
    </template>
    <template v-slot:body-row>
      <TableBRow v-for="(i,index) in driver_list.drivers"
                 icon="true"
                 :id="index" cursor="pointer"
                 :col1="{name:i?.first_name + ' ' + i?.last_name || '--',type:'def'}"
                 :col2="{name:i?.email || '--',type:'def'}"
                 :col3="{name:i?.phone || '--',type:'def'}"
                 :col4="{name:i?.col4 || '--',type:'def'}"
                 :col5="{name:i?.col5 || '--',type:'def'}"
                 :col7="{name:i?.created_at || '--',type:'def',}"
      >
        <template v-slot:end>
          <td>
            <v-svg class="mx-1" @click="downloadZip(i.id,'driver')" id="download-table" width="32" height="26"/>
            <v-svg class="mx-1" @click="$router.push(`/reports/${i.id}/drivers`)" id="edit-table" width="32" height="26"/>
            <v-svg class="mx-1" @click="modal_delete = i.id" id="remove-table" width="32" height="26"/>
          </td>
        </template>
      </TableBRow>
    </template>
  </v-table>
  <v-table-none v-else></v-table-none>
  <teleport to="body">
    <ModalDelete v-if="modal_delete" @close="modal_delete = null" @delete="deleteDriver"/>
  </teleport>
</template>
<script>
import VTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import VBtn from "@/components/ui/vBtn";
import TableHRow from "@/components/app/table/TableHRow";
import TableBRow from "@/components/app/table/TableBRow";
import {computed, onMounted, ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import {deleteDriverById, driver_list, getDriverList} from "@/hooks/driver/useDriver";
import ModalDelete from "@/components/app/modals/ModalDelete";
import {downloadZip} from "@/hooks/app/downloadZip";
import VTableNone from "@/components/app/table/vTableNone";

export default {
  components: {VSvg, TableBRow, ModalDelete, VTableNone, TableHRow, VBtn, TableTool, VTable},
  setup() {
    let data_head = null;
    let modal_delete = ref(null);
    data_head = [
      {name:'Driver Name'},
      {name:'Email'},
      {name:'Phone number'},
      {name:'Assigned Truck'},
      {name:'Assigned Trailer'},
      {name:'Date Created'},
      {class:'w-150',name:'Actions'}
    ];
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (driver_list?.value?.count) ? driver_list.value.count : 0);
    let pages = computed(() => (driver_list?.value?.count) ? Math.ceil(driver_list.value.count/limit.value) : 0);


    async function fetchList(obj){
      if(obj?.type==='limit') page.value = 1
      await getDriverList({limit:limit.value,page:page.value});
    }
    async function deleteDriver(){
      await deleteDriverById(modal_delete.value);
      await fetchList();
      modal_delete.value = null;
    }


    onMounted(()=>fetchList())
    return {data_head, limit, modal_delete, count, driver_list, page, downloadZip, deleteDriver, pages, fetchList,}

  }

}
</script>