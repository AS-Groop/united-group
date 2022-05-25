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
    <div class="login__card-item right">
      <template v-if="enter && !forgot">
        <v-input class-name="mb-15" label="Username" place="Enter username"/>
        <v-input class-name="mb-15" label="Password" place="Enter password"/>
      </template>
      <template v-if="!enter && forgot">
        <p class="text-h2">Recover Password</p>
        <p class="text-h4">Please enter your email address and we’ll send you instructions on how to reset your password.</p>
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
        {{enter && !forgot ? 'Log in' : !enter && forgot ? 'Recover' : !enter && !forgot ? 'Recover' : 'Update Password'}}
        </v-btn>
    </div>
  </div>
</template>
<script>
import VInput from "@/components/ui/vInput";
import VBtn from "@/components/ui/vBtn";
import {ref} from "vue";
import router from "@/router";
export default {
  components: {VBtn, VInput},
  setup(){
    const enter = ref(true);
    const forgot = ref(false);
    function mode(){
      if(enter.value && !forgot.value){
        enter.value = false;
        forgot.value = true;
        return;
      }
      if(!enter.value && forgot.value){
        enter.value = false;
        forgot.value = false;
        return;
      }
      if(!enter.value && !forgot.value){
        enter.value = true;
        forgot.value = true;
        return;
      }
      if(enter.value && forgot.value){
        router.push('/dashboard')
      }
    }
    return{enter,forgot, mode}
  }
}
</script>