<template>
  <div class="section">
    <HeaderDefault/>
    <router-view />
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import ReportsMainPage from "@/components/views/reports/ReportsMainPage"

export default {
  components: {ReportsMainPage, HeaderDefault}
}
</script>
