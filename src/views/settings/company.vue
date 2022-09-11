<template>
  <div class="section">
    <HeaderDefault/>
    <CompanyMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import CompanyMainPage from "@/components/views/settings/CompanyMainPage";

export default {
  components: {CompanyMainPage, HeaderDefault}
}
</script>
