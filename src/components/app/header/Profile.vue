<template>
  <div class="header__profile" @click.stop="modelValue=!modelValue, $emit('update:modelValue',modelValue)">
    <div class="img">
      <img src="@/assets/images/person-icon.png" alt="">
    </div>
    <span class="text-h4">Profile</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M17.45 10.525L12.5 15.475C12.4167 15.5583 12.3333 15.6166 12.25 15.65C12.1667 15.6833 12.075 15.7 11.975 15.7C11.875 15.7 11.7833 15.6833 11.7 15.65C11.6167 15.6166 11.5333 15.5583 11.45 15.475L6.475 10.5C6.325 10.35 6.25 10.1708 6.25 9.96245C6.25 9.75412 6.325 9.57495 6.475 9.42495C6.625 9.27495 6.80833 9.20412 7.025 9.21245C7.24167 9.22078 7.425 9.29995 7.575 9.44995L11.975 13.85L16.4 9.42495C16.55 9.27495 16.725 9.19995 16.925 9.19995C17.125 9.19995 17.3 9.27495 17.45 9.42495C17.6 9.57495 17.675 9.75829 17.675 9.97495C17.675 10.1916 17.6 10.375 17.45 10.525Z"/>
    </svg>
    <ul class="header__profile-drop" v-if="modelValue">
      <li class="text-h6" @click="logout">Log out</li>
    </ul>
  </div>
</template>
<script>
import {ref} from "vue";
import router from "@/router";

export default {
  props: ['modelValue'],
  setup() {
    function logout() {
      localStorage.setItem('access_token','');
      localStorage.setItem('refresh_token','');
      router.push('/login')
    }
    return{logout}
  }
}
</script>