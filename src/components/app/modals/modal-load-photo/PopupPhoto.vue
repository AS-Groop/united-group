<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__load-photo">
      <div class="popup__close">
        <v-svg id="close-popup" width="48" height="48" @click="$emit('close')"/>
      </div>
      <div class="popup__photo">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg}


}
</script>