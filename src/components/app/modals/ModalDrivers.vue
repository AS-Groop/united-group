<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__drivers">

      <div class="modal__body">
        <vLoading v-if="loading" />
        <template v-else>
          <div class="title text-h1">
            {{ data.title }}
            <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
          </div>
          <div class="hr"></div>
          <div class="modal__items">
            <template v-if="data && data.groups" v-for="(item, index) in data.groups">
              <div :class="item.title!=='Attachments'?'col':'col-12'" >
                <StandardItems @loading="test" :title="item.title" v-if="item.title!=='Attachments'" :step_id="modal_data" :fields="item.fields"></StandardItems>
                <DownloadFiles v-else/>
              </div>
              <template v-if="item.title ==='Comments' && item.fields[0].values">
                <div class="col" v-for="i in item.fields[0].values">
                  <div style="min-height: 162px"  class="modal__item">
                    <h2 class="text-h2">Comments</h2>
                    <div class="modal__commit text-h6">
                      <p class="modal__commit-text">{{i.value}}</p>
                      <p class="modal__commit-date">{{ i.created_at }}</p>
                    </div>
                  </div>
                </div>

              </template>
            </template>
          </div>
          <div class="save_btn">
          <v-btn type="100">Save</v-btn>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import vLoading from "@/components/ui/vLoading";
import ModalInput from "@/components/views/drivers/modals/ModalInput";
import ModalTextarea from "@/components/views/drivers/modals/ModalTextarea";
import DownloadFiles from "@/components/views/drivers/modals/DownloadFiles";
import VBtn from "@/components/ui/vBtn";
import ModalSelect from "@/components/views/drivers/modals/ModalSelect";
import ModalCommit from "@/components/views/drivers/modals/ModalCommit";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import StandardItems from "@/components/views/drivers/modals/StandartItems";
import router from "@/router";
import {form_driver_step, form_list_entities, getFormListEntities, getFormStepDriver} from "@/hooks/form/useForm";

export default {
  components: {ModalCommit, vLoading, ModalSelect, VBtn, DownloadFiles, ModalTextarea, ModalInput, VSvg, StandardItems},
  props: ['title', 'modal_data'],
  setup(props) {
    let loading = ref(false)
    const data = computed(() => form_driver_step.value);
    onBeforeMount(async () => {
      loading.value = true;
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
          }
        })
      })
      loading.value = false;
    })
    function test(v){
      console.log('test',v)
    }
    return {data, loading, test}
  }

}
</script>