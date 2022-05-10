<template>
  <div class="header">
    <div class="header__content">
<!--      <v-search/>-->
      <Profile/>
    </div>
  </div>
</template>
<script>
import Profile from "@/components/app/header/Profile";
import VSearch from "@/components/ui/vSearch";
export default {
  name: 'HeaderDefault',
  components: {VSearch, Profile}
}
</script>