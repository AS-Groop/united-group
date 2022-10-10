<template>
  <div class="section">
    <HeaderDefault />
    <TrailersMainPage v-if="user_permissions?.some(e=>e.alias==='get_all_trailer') || user_profile?.username==='admin'"/>
    <v-not-permissions v-else/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import TrucksMainPage from "@/components/views/trucks/TrucksMainPage";
import TrailersMainPage from "@/components/views/trailers/TrailersMainPage";
import VNotPermissions from "@/components/ui/vNotPermissions";
import {user_permissions, user_profile} from "@/hooks/user/useUser";
export default {
  components: {VNotPermissions, TrailersMainPage, HeaderDefault},
  setup(){
    return{user_profile,user_permissions}
  }
}
</script>
