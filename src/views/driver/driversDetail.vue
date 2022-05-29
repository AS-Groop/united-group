<template>
  <div class="section">
    <HeaderDefault />
    <DriversDetailPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversDetailPage from "@/components/views/drivers/DriversDetailPage";
export default {
  components: {DriversDetailPage,  HeaderDefault}
}
</script>
