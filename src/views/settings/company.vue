<template>
  <div class="section">
    <HeaderDefault/>
    <SettingsMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import ReportsMainPage from "@/components/views/reports/ReportsMainPage"
import SettingsMainPage from "@/components/views/settings/SettingsMainPage";

export default {
  components: {SettingsMainPage, HeaderDefault}
}
</script>
