<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__load-photo">
      <div class="modal__body">
        <div class="title text-h1">
          {{data.title}} <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>
        <div class="modal__load-body">
          <div class="modal__load-item">
            <label>
              <input type="file" @change="uploadImage" class="d-none">
              <v-svg id="loaded-image" width="61" height="60"/>
            </label>
          </div>
          <template v-if="images.length > 0">
            <LoadPhotoItem @remove="remove(img)" @click="$emit('popupImg')" :img="img" v-for="(img,index) in images"/>
          </template>
        </div>
        <div class="save_btn">
          <v-btn type="100" @click="$emit('close')">Save</v-btn>
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
import {uploadFile} from "@/hooks/file/useFile";
import {postInspectTruck} from "@/hooks/truck/useTruck";
import {computed, ref} from "vue";
export default {
  components: {LoadPhotoItem, CheckListItem, VBtn, VSvg},
  props: ['data','data_target'],
  setup(props, ctx){
    const images = computed(() => props.data_target[props.data.name] || []);
    const remove = (id) => {
      props.data_target[props.data.name] = props.data_target[props.data.name].filter(i => i !== id);
      ctx.emit('update:data_target', props.data_target);
    }
    async function uploadImage(e) {
      let file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      await uploadFile(data).then(data=> {
        props.data_target[props.data.name] = props.data_target[props.data.name] || [];
        props.data_target[props.data.name].push(data.file_id);
        ctx.emit('update:data_target', props.data_target);
        // ctx.data
      });
    }
    return{uploadImage, images, remove}
  }

}
</script>