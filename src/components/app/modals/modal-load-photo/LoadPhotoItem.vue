<template>
  <div class="modal__load-item">
    <img src="@/assets/images/tires1.png" alt="">
    <div class="remove">
      <v-svg id="remove-image" width="30" height="30"/>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['image']
}
</script>