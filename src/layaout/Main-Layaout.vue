<template>
  <div class="container">
    <!----Loader---->
<!--  <Preloader v-if="load" />-->
  <!--App Start-->
    <!--Page-->
    <div class="main__layout">

        <Sidebar></Sidebar>

      <!--///////////Page content wrapper///////////////-->
      <main class="page-content d-flex flex-column flex-row-fluid">

        <!----Header---->
<!--        <HeaderDefault />-->

        <!----Router---->
          <router-view></router-view>


        <!----Footer---->
<!--        <Footer />-->
      </main>
      <!--///////////Page content wrapper End///////////////-->
    </div>
  </div>

</template>

<script>


import Sidebar from "@/components/app/sidebar";
export default {
  components: {Sidebar}
}
</script>