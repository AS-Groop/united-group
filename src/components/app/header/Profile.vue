<template>
  <div class="content">
    <svg class="noti" :class="notification && 'active'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 23C13.2199 23 13.9103 22.7103 14.4193 22.1946C14.9283 21.6789 15.2143 20.9795 15.2143 20.2501H9.78571C9.78571 20.9795 10.0717 21.6789 10.5807 22.1946C11.0897 22.7103 11.7801 23 12.5 23ZM13.8504 2.51225C13.8693 2.32107 13.8485 2.12799 13.7892 1.94546C13.73 1.76294 13.6337 1.59502 13.5064 1.45253C13.3792 1.31005 13.2239 1.19616 13.0505 1.11822C12.8772 1.04027 12.6897 1 12.5 1C12.3103 1 12.1228 1.04027 11.9495 1.11822C11.7761 1.19616 11.6208 1.31005 11.4936 1.45253C11.3663 1.59502 11.27 1.76294 11.2108 1.94546C11.1515 2.12799 11.1307 2.32107 11.1496 2.51225C9.61569 2.82834 8.2367 3.6718 7.24618 4.8998C6.25566 6.1278 5.71448 7.66488 5.71429 9.25075C5.71429 10.7604 5.03571 17.5003 3 18.8752H22C19.9643 17.5003 19.2857 10.7604 19.2857 9.25075C19.2857 5.92343 16.9514 3.14609 13.8504 2.51225Z" fill="#B6B6B6"/>
      <circle cx="21" cy="3" r="3" fill="#2F80ED"/>
    </svg>
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
  props: ['modelValue','notification'],
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
      update_profile.value.username = user_profile.value?.username || "";
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
<style scoped>
.content{
  display: flex;
  align-items: center;
  margin-left: auto;
}
.noti{
  cursor: pointer;
  margin-right: 16px;
}
</style>