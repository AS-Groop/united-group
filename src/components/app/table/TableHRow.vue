<template>
  <tr>
    <th v-if="icon" class="icon"> <v-checked id="all"/> </th>
    <th v-if="data.length" v-for="name in data"><div>{{name}}</div></th>
  </tr>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
export default {
  components: {VChecked},
  props:['icon','data']
}
</script>