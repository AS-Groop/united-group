<template>
  <div class="container">
    <div class="main__layout">
      <Sidebar></Sidebar>
      <main class="page__content">
        <!----Router---->
        <router-view></router-view>
      </main>
    </div>
  </div>

</template>

<script>
import Sidebar from "@/components/app/Sidebar";

export default {
  components: {Sidebar},
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  }
}
</script>