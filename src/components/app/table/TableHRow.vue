<template>
  <tr>
    <th v-if="icon" class="icon"> <v-checked id="all"/> </th>
    <th v-if="data.length" :class="item.class" v-for="item in data"><div>{{item.name}}</div></th>
  </tr>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
export default {
  components: {VChecked},
  props:['icon','data']
}
</script>