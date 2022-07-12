<template>
  <div class="section">
    <HeaderDefault />
    <DashboardMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DashboardMainPage from "@/components/views/dashboard/DashboardMainPage";
import toast from "@/use/toast";
export default {
  components: {DashboardMainPage, HeaderDefault},
  mounted() {
    toast('100','success')
  }
}
</script>
