<template>
  <div class="section">
    <HeaderDefault />
    <TrailersMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TrucksMainPage from "@/components/views/trucks/TrucksMainPage";
import TrailersMainPage from "@/components/views/trailers/TrailersMainPage";
export default {
  components: {TrailersMainPage, HeaderDefault}
}
</script>
