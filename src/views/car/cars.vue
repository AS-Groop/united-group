<template>
  <div class="section">
    <HeaderDefault />
    <CarsMainPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TrucksMainPage from "@/components/views/trucks/TrucksMainPage";
import TrailersMainPage from "@/components/views/trailers/TrailersMainPage";
import CarsMainPage from "@/components/views/cars/CarsMainPage";
export default {
  components: {CarsMainPage, TrailersMainPage, HeaderDefault}
}
</script>
