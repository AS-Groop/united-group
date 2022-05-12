<template>
  <div class="drivers__detail-item" @click="$emit('click')">
    <v-checked :id="id" class-name="check"/>
    {{ name }}
  </div>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
export default {
  components: {VChecked},
  props:['name','id']
}
</script>