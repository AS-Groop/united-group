<template>
  <div class="section">
    <HeaderDefault/>
    <RoleMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import ReportsMainPage from "@/components/views/reports/ReportsMainPage"
import SettingsMainPage from "@/components/views/settings/SettingsMainPage";
import RoleMainPage from "@/components/views/settings/RoleMainPage";

export default {
  components: {RoleMainPage, SettingsMainPage, HeaderDefault}
}
</script>
