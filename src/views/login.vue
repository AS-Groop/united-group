<template>
  <div class="section section__login" >
    <div class="login__wrap"></div>
    <LoginCard>

    </LoginCard>
  </div>
</template>
<script>
import VInput from "@/components/ui/vInput";
import VBtn from "@/components/ui/vBtn";
import LoginCard from "@/components/views/login/LoginCard";
export default {
  components: {LoginCard, VBtn, VInput}
}
</script>

<style lang="scss">
.section{
  &__login {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: relative;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../assets/images/login_bg.png");
  }
}
</style>
