<template>

  <v-table v-if="all_trailers_history_list?.history"
           :count="count" :pages="pages"
           v-model:limit="limit"
           @update:limit="fetchList({type:'limit'})"
           v-model:page="page"
           @update:page="fetchList">
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
      <TableBRow v-for="(i,index) in all_trailers_history_list.history"
                 icon="true" :id="i.id" cursor="pointer"
                 :col1="{name:i.trailer_number || '--',type:'def'}"
                 :col2="{name:i.trailer_make || '--',type:'def'}"
                 :col3="{name:i.trailer_type || '--',type:'def'}"
                 :col4="{name:i.trailer_year_made || '--',type:'def'}"
                 :col6="{name:i.driver_name || '--',type:'def'}"
                 :col7="{name:i.inspection_type || '--',type:'def',}"
                 :col8="{name:i.created_at || '--',type:'def',}"
      >
        <template v-slot:end>
          <td class="w-150">
            <v-svg class="mx-1"  @click="downloadZip(i.id,'trailer')" id="download-table" width="32" height="26"/>
            <v-svg class="mx-1" @click="$router.push(`/reports/${i.id}/trailers`)" id="edit-table" width="32" height="26"/>
            <v-svg class="mx-1 me-15" @click="modal_delete = i.id" id="remove-table" width="32" height="26"/>
          </td>
        </template>
      </TableBRow>
    </template>
  </v-table>
  <v-table-none v-else></v-table-none>
  <teleport to="body">
    <ModalDelete v-if="modal_delete" @close="modal_delete = null" @delete="deleteTrailer"/>
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
import {
  all_trailers_history_list,
  deleteTrailerHistoryById,
  getAllTrailersHistoryList
} from "@/hooks/trailer/useTrailerHistory";
import ModalDelete from "@/components/app/modals/ModalDelete";
import VTableNone from "@/components/app/table/vTableNone";
import {downloadZip} from "@/hooks/app/downloadZip";

export default {
  components: {VSvg, TableBRow, TableHRow, VBtn, TableTool, VTable, VTableNone, ModalDelete},
  setup() {
    let data_head = [
      {name:'Trailer Number'},
      {name:'Make'},
      {name:'Model'},
      {name:'Year Made'},
      {name:'Assigned Driver'},
      {name:'Status'},
      {name:'Date Created'},
      {class:'w-150',name:'Actions'}
    ];
    let data_body = null;
    let modal_delete = ref(null)
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (all_trailers_history_list?.value?.count) ? all_trailers_history_list.value.count : 0);
    let pages = computed(() => (all_trailers_history_list?.value?.count) ? Math.ceil(all_trailers_history_list.value.count / limit.value) : 0);

    async function fetchList(obj) {
      if (obj?.type === 'limit') page.value = 1;
      await getAllTrailersHistoryList({limit: limit.value, page: page.value});
    }

    async function deleteTrailer(){
      await deleteTrailerHistoryById(modal_delete.value)
      await fetchList();
      modal_delete.value = null;
    }


    return {data_head, data_body, all_trailers_history_list, downloadZip, page, deleteTrailer, count, pages, modal_delete, fetchList, limit}

  },

}
</script>