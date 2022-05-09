<template>
  <div class="login">


    <div class="d-flex flex-column flex-root h-100">
      <!--Page-->
      <div class="page d-flex flex-row flex-column-fluid">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<style>
</style>

<script>

export default {
  name: 'EmptyLayout',
}
</script>