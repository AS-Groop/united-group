<template>
  <div class="section">
    <HeaderDefault />
    <TrucksMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TrucksMainPage from "@/components/views/trucks/TrucksMainPage";
export default {
  components: {TrucksMainPage, HeaderDefault}
}
</script>
