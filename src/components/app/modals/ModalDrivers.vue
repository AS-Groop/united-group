<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__drivers">
      <div class="modal__body">
        <div class="title text-h1">
          {{ data.title }}<v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>
        <div class="hr"></div>
        <div class="modal__items">
          <div class="col" v-if="modal_data.select_name">
          </div>
          <div class="col item">
            <div>
              <ModalSelect :name="'modal_data.select_name'"/>
            </div>
            <div>
              <ModalTextarea/>
            </div>
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
import {computed, onMounted} from "vue";
import router from "@/router";
import {form_driver_step, getFormStepDriver} from "@/hooks/form/useDriver";
export default {
  components: {ModalCommit, ModalSelect, VBtn, DownloadFiles, ModalTextarea, ModalInput,  VSvg},
  props: ['title','modal_data'],
  setup(props){
    const data = computed(()=>form_driver_step.value)
    onMounted(()=>{
      let obj = {
        driver_id: router.currentRoute.value.params.id,
        step_id: props.modal_data
      }
      getFormStepDriver(obj)
    })
    return{data}
  }

}
</script>