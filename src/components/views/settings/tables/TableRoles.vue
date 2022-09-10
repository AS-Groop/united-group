<template>
    <table class="table__settings text-h2">
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-if="all_roles_list?.roles">
      <tr v-for="i in all_roles_list.roles">
        <td>{{ i.name }}</td>
        <td>{{ i.description }}</td>
        <td class="icon">
          <v-svg class="mx-1 pointer" @click="$emit('editUser')" id="edit-table" width="32"
                 height="26"/>
          <v-svg class="mx-1 me-15 pointer" @click="$emit('delete')"  id="remove-table" width="32" height="26"/>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {all_roles_list} from "@/hooks/role/useRole";
export default {
  components: {VSvg},
  setup(){


    return{all_roles_list}
  }
}
</script>