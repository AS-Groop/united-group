<template>
  <div class="section">
    <HeaderDefault />
    <DriversMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversMainPage from "@/components/views/drivers/DriversMainPage";
export default {
  components: {DriversMainPage, HeaderDefault}
}
</script>
