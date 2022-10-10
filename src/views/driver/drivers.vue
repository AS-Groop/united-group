<template>
  <div class="section">
    <HeaderDefault />
    <DriversMainPage v-if="user_permissions?.some(e=>e.alias==='get_drivers') || user_profile?.username==='admin'"/>
    <v-not-permissions v-else/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversMainPage from "@/components/views/drivers/DriversMainPage";
import VNotPermissions from "@/components/ui/vNotPermissions";
import {user_permissions, user_profile} from "@/hooks/user/useUser";
export default {
  components: {VNotPermissions, DriversMainPage, HeaderDefault},
  setup(){
    return{user_permissions,user_profile}
  }
}
</script>
