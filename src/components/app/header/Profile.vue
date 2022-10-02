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
      <li class="text-h6" @click="modal_profile = true">Profile</li>
      <li class="text-h6" @click="logout">Log out</li>
    </ul>
  </div>
  <teleport to="body">
    <ModalAdded v-if="modal_profile"
                title="Profile"
                @save="updateProfile"
                @close="modal_profile = false">
      <template v-slot:img>
        <div class="img-input">
          <!--        <input type="file" accept="image/*">-->
          <img v-if="true" src="@/assets/images/person-icon.png" alt="">
          <v-svg v-else id="loaded-image" width="61" height="60"/>
        </div>
      </template>
      <template v-slot:content>
        <v-input v-model="update_profile.first_name"  label="Name" place="Enter name"/>
        <v-input v-model="update_profile.last_name"  label="Last name" place="Enter last name"/>
        <v-input v-model="update_profile.username"  label="Username" place="Enter username"/>
        <!--      <v-input v-model="update_profile.old_password"  label="Last name" place="Enter old password"/>-->
        <!--      <v-input v-model="update_profile.new_password"  label="Last name" place="Enter new password"/>-->
      </template>
    </ModalAdded>
  </teleport>
</template>
<script>
import {onMounted, reactive, ref} from "vue";
import router from "@/router";
import VInput from "@/components/ui/vInput";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VSvg from "@/components/ui/vSvg";
import {getUserProfile, updateUserProfile, user_permissions, user_profile} from "@/hooks/user/useUser";

export default {
  components:{VInput ,ModalAdded, VSvg},
  props: ['modelValue'],
  setup() {
    const update_profile = ref({});
    const modal_profile = ref(false)
    function logout() {
      localStorage.setItem('access_token','');
      localStorage.setItem('refresh_token','');
      router.push('/login')
    }

    function profile(){
      update_profile.value.first_name = user_profile.value?.first_name || "";
      update_profile.value.last_name = user_profile.value?.last_name || "";
      update_profile.value.username = user_profile.value?.username || "";\
    }

    function updateProfile(){
      updateUserProfile(update_profile.value)
    }

    onMounted(async ()=> {
      await getUserProfile();
      profile();
    })
    return{logout, update_profile, updateProfile, modal_profile, profile}
  }
}
</script>