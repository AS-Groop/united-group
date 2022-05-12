<template>
  <div class="detail__nav">
    <slot></slot>
  </div>
</template>
<script>
import VSearch from "@/components/ui/vSearch";
export default {
  components: {VSearch}
}
</script>