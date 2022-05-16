<template>
  <div class="section">
    <HeaderDefault />
    <TruksDetailContent/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TruksDetailContent from "@/components/views/trucks/TruksDetailContent";
export default {
  components: {TruksDetailContent, HeaderDefault}
}
</script>
