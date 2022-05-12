<template>
  <div class="detail__nav-back">
    <v-svg @click="$router.push('/drivers')" id="icon-arrowLeft" width="24" height="24" />
    <span class="text-h3">Ahmad Zakirov</span>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg}
}
</script>