<template>
  <label class="trucks__pick-inputs">
    <span class="wrapper"><b class="text-h0">+{{ count || 0 }}</b> <span class="text-h2-med"> {{ title }} </span></span>
    <img v-if="img" src="@/assets/images/tires1.png" alt="">
    <v-svg :id="svg" width="106" height="106"/>
  </label>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['img','svg','title','count']
}
</script>