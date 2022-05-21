<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__load-photo">
      <div class="modal__body">
        <div class="title text-h1">
          {{title}} <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>
        <div class="modal__load-body">
          <div class="modal__load-item">
            <label>
              <input type="file" class="d-none">
              <v-svg id="loaded-image" width="61" height="60"/>
            </label>
          </div>
          <LoadPhotoItem @click="$emit('popupImg')" />
          <LoadPhotoItem @click="$emit('popupImg')" />
          <LoadPhotoItem @click="$emit('popupImg')" />
          <LoadPhotoItem @click="$emit('popupImg')" />
        </div>
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
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import LoadPhotoItem from "@/components/app/modals/modal-load-photo/LoadPhotoItem";
export default {
  components: {LoadPhotoItem, CheckListItem, VBtn, VSvg},
  props: ['title']

}
</script>