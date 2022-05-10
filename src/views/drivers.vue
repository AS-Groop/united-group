<template>
  <div class="section">
    <HeaderDefault />
    <PageMain/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import PageMain from "@/components/views/drivers/PageMain";
export default {
  components: {PageMain, HeaderDefault}
}
</script>
