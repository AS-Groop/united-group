<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__check-list">
      <div class="modal__body">
        <div class="title text-h1">
          {{title}} <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>

        <slot></slot>

        <div class="btns">
          <v-btn type="outline" @click="$emit('close')">Cancel</v-btn>
          <v-btn type="100" @click="$emit('save')">Save</v-btn>
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
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
export default {
  components: {CheckListItem, VBtn, VSvg},
  props: ['title']

}
</script>