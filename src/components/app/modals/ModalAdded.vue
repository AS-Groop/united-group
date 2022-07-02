<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__added">
      <div class="modal__body">
        <div class="title text-h1">
          {{ title }}
        </div>
        <div class="hr"></div>
        <div class="row">
          <div class="col">
            <div class="modal__added-image">
              <label class="img">
                <slot name="img"></slot>
              </label>
            </div>
          </div>
          <div class="col">
            <div class="modal__added-content">
              <slot name="content"></slot>
            </div>
            <div class="buttons">
              <v-btn @click="$emit('close')" type="outline">Cancel</v-btn>
              <v-btn @click="$emit('save')" >Save</v-btn>
            </div>
          </div>
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
  components: { VBtn, VSvg},
  props: ['title','modal_data']

}
</script>