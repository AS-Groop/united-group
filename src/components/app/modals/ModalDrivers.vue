<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__drivers">
      <div class="modal__body">
        <div class="title text-h1">
          {{ modal_data.name }}<v-svg @click="$emit('close')" id="icon-close" width="30" height="30"/>
        </div>
        <div class="hr"></div>
        <div class="modal__items">
          <div class="col" v-if="modal_data.select_name">
            <ModalSelect :name="modal_data.select_name"/>
          </div>
          <div class="col item">
            <ModalTextarea/>
            <ModalInput/>
            <ModalCommit/>
          </div>
        </div>
        <DownloadFiles/>
        <div class="save_btn">
          <v-btn type="100">Save</v-btn>
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
import ModalCommit from "@/components/views/drivers/modals/ModalCommit";
export default {
  components: {ModalCommit, ModalSelect, VBtn, DownloadFiles, ModalTextarea, ModalInput,  VSvg},
  props: ['title','modal_data']

}
</script>