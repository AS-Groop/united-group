<template>
  <div class="filter__bar">
    <v-search v-if="!notSearch" v-model="modelValue" @update:modelValue="(val)=>$emit('update:modelValue',val)"/>
    <div class="filter__btns">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import VSearch from "@/components/ui/vSearch";
export default {
  props:['modelValue', 'notSearch'],
  components: {VSearch}
}
</script>