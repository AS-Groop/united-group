<template>
  <div class="filter__bar">
    <v-search/>
    <div class="filter__btns">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import VSearch from "@/components/ui/vSearch";
export default {
  components: {VSearch}
}
</script>