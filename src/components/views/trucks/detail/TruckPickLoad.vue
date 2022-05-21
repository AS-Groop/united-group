<template>
  <label class="trucks__pick-inputs">
    <img v-if="img" src="#" alt="">
    <v-svg v-else :id="svg" width="106" height="106"/>
  </label>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['img','svg']
}
</script>