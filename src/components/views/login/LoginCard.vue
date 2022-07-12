<template>
  <div class="login__card">
    <div class="login__card-item left">
      <div class="login__card-logo">
        <img src="@/assets/images/login-logo.svg" alt="">
      </div>
      <div class="login__card-text">
        To sign in, use your preassigned login credentials.
      </div>
    </div>
    <form @submit.prevent="mode" class="login__card-item right">
      <template v-if="enter && !forgot">
        <v-input class-name="mb-15" v-model="user_name" label="Username" place="Enter username">
          <v-svg class-name="icon-input" id="mass" width="18" height="18"/>
        </v-input>
        <v-input class-name="mb-15" v-model="pass_word" :type="pass__type ? 'password' : 'text'" label="Password" place="Enter password">
          <v-svg class-name="icon-input" @click="pass__type = !pass__type" :id="pass__type ? 'eiy-close' :'eiy'" width="18" height="19"/>
        </v-input>
      </template>
      <template v-if="!enter && forgot">
        <p class="text-h2">Recover Password</p>
        <p class="text-h4">Please enter your email address and we’ll send you instructions on how to reset your
          password.</p>
        <v-input class-name="mb-15" label="Email" place="Enter email"/>
      </template>
      <template v-if="!enter && !forgot">
        <p class="text-h2">2 -Step Verification - Email</p>
        <p class="text-h4">Enter the 4- digit code sent to you</p>
        <v-input class-name="mb-15" label="Verification Code" place="Enter code"/>
      </template>
      <template v-if="enter && forgot">
        <p class="text-h2">Update Your Password</p>
        <v-input class-name="mb-15" label="New password" place="Enter Your new password"/>
        <v-input class-name="mb-15" label="New password" place="Re- enter Your new password"/>
      </template>

      <div class="text-h4 forgot mb-15">Forgot Password?</div>
      <v-btn type="100" @click="mode">
        {{ enter && !forgot ? 'Log in' : !enter && forgot ? 'Recover' : !enter && !forgot ? 'Recover' : 'Update Password' }}
      </v-btn>
    </form>
  </div>
</template>
<script>
import VInput from "@/components/ui/vInput";
import VBtn from "@/components/ui/vBtn";
import {ref, watch} from "vue";
import router from "@/router";
import {useAuth} from '@/hooks/auth/useAuth'
import VSvg from "@/components/ui/vSvg";

export default {
  components: {VSvg, VBtn, VInput},
  setup() {
    const enter = ref(true);
    const forgot = ref(false);
    let pass__type = ref(true);
    const user_name = ref('');
    const pass_word = ref('');


    function mode() {
      if (enter.value && !forgot.value) {
        const obj = {
          password: pass_word.value,
          username: user_name.value
        }
        useAuth(obj);
        // enter.value = false;
        // forgot.value = true;
        return;
      }
      if (!enter.value && forgot.value) {
        enter.value = false;
        forgot.value = false;
        return;
      }
      if (!enter.value && !forgot.value) {
        enter.value = true;
        forgot.value = true;
        return;
      }
      if (enter.value && forgot.value) {
        router.push('/dashboard')
      }
    }

    return {enter, forgot, mode, user_name, pass__type, pass_word}
  }
}
</script>