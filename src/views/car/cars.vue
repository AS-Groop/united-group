<template>
  <div class="section">
    <HeaderDefault />
    <CarsMainPage v-if="user_permissions?.some(e=>e.alias==='get_all_cars')"/>
    <v-not-permissions v-else/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TrucksMainPage from "@/components/views/trucks/TrucksMainPage";
import TrailersMainPage from "@/components/views/trailers/TrailersMainPage";
import CarsMainPage from "@/components/views/cars/CarsMainPage";
import VNotPermissions from "@/components/ui/vNotPermissions";
import {user_permissions} from "@/hooks/user/useUser";
export default {
  components: {VNotPermissions, CarsMainPage, TrailersMainPage, HeaderDefault},
  setup() {
    return {user_permissions}
  }
}
</script>
