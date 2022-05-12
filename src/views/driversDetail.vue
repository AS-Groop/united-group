<template>
  <div class="section">
    <HeaderDefault />
    <DriversDetailPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversMainPage from "@/components/views/drivers/DriversMainPage";
import DriversDetailPage from "@/components/views/drivers/DriversDetailPage";
export default {
  components: {DriversDetailPage, DriversMainPage, HeaderDefault}
}
</script>
