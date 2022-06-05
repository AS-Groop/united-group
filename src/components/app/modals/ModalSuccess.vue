<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__delete">
      <div class="modal__body">
        <div class="modal__delete-image">
          <v-svg id="success-img" width="200" height="200"/>
        </div>
        <div class="modal__delete-content text-h3 text-gray3">
          Success
        </div>
        <div class="buttons">
          <v-btn @click="$emit('close')" type="lg" size="100">OK</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import ModalInput from "@/components/views/drivers/modals/ModalInput";
import ModalTextarea from "@/components/views/drivers/modals/ModalTextarea";
import DownloadFiles from "@/components/views/drivers/modals/DownloadFiles";
import VBtn from "@/components/ui/vBtn";
import ModalSelect from "@/components/views/drivers/modals/ModalSelect";
import VInput from "@/components/ui/vInput";

export default {
  components: {VBtn, VSvg},
  props: ['title', 'modal_data']

}
</script>