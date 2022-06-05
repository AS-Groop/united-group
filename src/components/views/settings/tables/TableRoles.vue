<template>
    <table class="table__settings text-h2">
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>Admin</td>
        <td>Unrestricted access to all modules.</td>
        <td class="icon">
          <v-svg class="mx-1" @click="$emit('editUser')" id="edit-table" width="32"
                 height="26"/>
          <v-svg class="mx-1 me-15" @click="$emit('delete')"  id="remove-table" width="32" height="26"/>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg}
}
</script>