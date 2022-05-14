<template>
  <div>
    <div v-for="(item,i) in items" class="drivers__detail-item" @click="$emit('click',item)">
      <v-checked :id="item.name" class-name="check"/>
      {{ item.name }}
    </div>
  </div>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
export default {
  components: {VChecked},
  props:['name','id','items'],
  data(){
    return{
    }
  }
}
</script>