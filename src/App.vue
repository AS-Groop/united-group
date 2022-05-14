<template>
<!--  <component :is="layout">-->
    <router-view/>
<!--  </component>-->
</template>

<script>
import MainLayout from "./layaout/Main-Layaout";
import EmptyLayout from "./layaout/EmptyLayout";
import UiLayout from "./layaout/Ui-Layaout";

export default {
  components: {MainLayout,EmptyLayout,UiLayout},
  computed:{
    layout(){
      return (this.$route.meta.layout || 'Main') + 'Layout'
    }
  },
  mounted() {
    console.log(this.$route.meta)
  }
};

</script>

<style lang="scss">

</style>
