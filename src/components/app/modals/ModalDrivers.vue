<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__drivers">
      <div class="modal__body">
        <div class="title text-h1">
          {{ data.title }}
          <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>
        <div class="hr"></div>
        <div class="modal__items">
          <template v-if="data && data.groups" v-for="(item, index) in data.groups">
            <div :class="item.title!=='Attachments'?'col':'col-12'" >
              <StandardItems :title="item.title" v-if="item.title!=='Attachments'" :fields="item.fields"></StandardItems>
              <DownloadFiles v-else/>
            </div>
          </template>
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
import {computed, onBeforeMount, onMounted} from "vue";
import StandardItems from "@/components/views/drivers/modals/StandartItems";
import router from "@/router";
import {form_driver_step, form_list_entities, getFormListEntities, getFormStepDriver} from "@/hooks/form/useForm";

export default {
  components: {ModalCommit, ModalSelect, VBtn, DownloadFiles, ModalTextarea, ModalInput, VSvg, StandardItems},
  props: ['title', 'modal_data'],
  setup(props) {
    const data = computed(() => form_driver_step.value)
    onBeforeMount(async () => {
      let obj = {
        driver_id: router.currentRoute.value.params.id,
        step_id: props.modal_data
      }
      await getFormStepDriver(obj);
      console.log(data.value)
      data.value.groups.forEach(e=>{
        e.fields.forEach(i=>{
          if(i.list_type && i.list_type.length){
            console.log(i.list_type)
             getFormListEntities({entities: i.list_type})
            console.log(form_list_entities.value)
          }
        })
      })
    })
    return {data}
  }

}
</script>