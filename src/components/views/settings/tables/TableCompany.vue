<template>
    <table class="table__settings company text-h2">
      <tbody v-if="all_companys_list?.companies">
      <tr v-for="i in all_companys_list.companies">
        <td>{{ i.name }}</td>
        <td class="icon">
          <v-svg class="mx-1 pointer" @click="$emit('editRole',i.id)" id="edit-table" width="32"
                 height="26"/>
          <v-svg class="mx-1 me-15 pointer" @click="$emit('delete',i.id)"  id="remove-table" width="32" height="26"/>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {all_companys_list} from "@/hooks/company/useCompany";
export default {
  components: {VSvg},
  setup(){
    return{all_companys_list}
  }
}
</script>