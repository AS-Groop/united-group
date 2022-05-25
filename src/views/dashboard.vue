<template>
  <div class="section">
    <HeaderDefault />
    <DashboardMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DashboardMainPage from "@/components/views/dashboard/DashboardMainPage";
export default {
  components: {DashboardMainPage, HeaderDefault}
}
</script>
