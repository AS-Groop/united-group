<template>
  <div class="header" :class="drop ? 'check' :''">
    <div class="header__content" @click="drop = false" @update:modelValue="val=>drop=val" :class="drop ? 'check' :''">
<!--      <v-search/>-->
      <Profile v-model="drop"/>
    </div>
  </div>
</template>
<script>
import Profile from "@/components/app/header/Profile";
import VSearch from "@/components/ui/vSearch";
import {ref} from "vue";
export default {
  name: 'HeaderDefault',
  components: {VSearch, Profile},
  setup(){
    const drop = ref(false)

    return {drop}
  }
}
</script>