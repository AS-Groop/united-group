<template>
  <div class="section">
    <HeaderDefault />
    <ReportsMainPage />
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import ReportsMainPage from "@/components/views/reports/ReportsMainPage"
export default {
  components: {ReportsMainPage, HeaderDefault}
}
</script>
