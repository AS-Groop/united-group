<template>
  <div class="container">
    <div class="main__layout main__layout-404">
      <div class="main__layout-404-content">
        <div class="back" @click="$router.push('/drivers')">
          <VSvg width="40" height="40" id="Capa_1"/>
        </div>
        <div class="img">
          <img src="../assets/images/67d62d1e0bc27de113cc0e25239705e2.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VSvg from "@/components/ui/vSvg";
export default {
  name: 'Layout404',
  components: {VSvg},
}
</script>