<template>
  <div class="modal__item">
    <template v-for="(field,index) in fields">
      <h2 class="text-h2">{{ field.name || field.name || title }}</h2>

<!--      For Textarea Group-->
      <template v-if="field.type === 'textarea'">
        <v-input-modal @onChange="(v)=>{changeInput(v,field,step_id,field.label !=='Comments'),valIn = v}" :inputValue="field.values && field.label !=='Comments' ?field.values[0].value:''" />
        <div class="add text-h3">
          <span @click="changeInput(valIn,field,step_id,true)" v-if="field.label ==='Comments'">Add</span>
        </div>
      </template>

<!--      For Text Group-->
      <template v-if="field.type === 'text' && field.alias !== '#truck-inspection-inspect' && field.alias !== '#trailer-inspection-inspect'">
            <v-input v-if="field.type === 'text'" v-model="modelVal['text'+index] " @onChange="changeInput(modelVal['text'+index],field,step_id,true)" class-name="mb-15" :place="field.hint"/>
      </template>

      <!--      For Inspect Button-->
      <template v-if="field.type === 'text' && (field.alias === '#truck-inspection-inspect' || field.alias === '#trailer-inspection-inspect')">
        <v-btn v-if="modelVal['text'+index]=== 'Inspected'" @click="inspected(field.alias)">Inspected</v-btn>
<!--        <v-btn v-else @click="changeInput('Inspected',field,step_id,true)">Inspected</v-btn>-->
        <v-btn v-else @click="inspected(field.alias)">Not Inspected</v-btn>
<!--        <v-input v-if="field.type === 'text'" v-model="modelVal['text'+index] " @onChange="changeInput(modelVal['text'+index],field,step_id,true)" class-name="mb-15" :place="field.hint"/>-->
      </template>

<!--      For Radio Group-->
      <template v-if="field.type === 'radiogroup'">
        <div class="modal__select">
          <RadioSelect @radioChange="(val)=>changeRadioLoc(val,field)" :title="field.name" :radio-checked="field.values && field.id === field.values[0].value" :name="field.type" />
        </div>
        <div v-if="field.child_fields && field.values && field.id === field.values[0].value" class="modal__select">
          <template v-for="i in field.child_fields">
            <v-input v-if="i.type === 'text'" class-name="mb-15" :place="i.hint"/>
            <ModalSelect @radioChange="(val)=>changeRadio(val,i,step_id,field.child_fields, 'child')"  v-if="i.type === 'select'" :listValue="i.values" :listType="i.list_type" />
          </template>
        </div>
      </template>

<!--      For Select Group-->
      <template v-if="field.type === 'select'">
<!--          <v-select v-if="form_list_entities[field.list_type]"-->
<!--                    v-model:select="select[field.list_type]" :place="field.name"-->
<!--                    class-name=""-->
<!--                    :options="form_list_entities[field.list_type].entities"/>-->

        <ModalSelect @radioChange="(val)=>changeRadio(val,field,step_id,fields, 'dif')" :listValue="field?.values || []" :listType="field.list_type" />
      </template>
    </template>
  </div>
</template>
<script>
import VInputModal from "@/components/ui/vInputModal";
import RadioSelect from "@/components/views/drivers/modals/RadioSelect";
import VInput from "@/components/ui/vInput";
import DownloadFiles from "@/components/views/drivers/modals/DownloadFiles";
import VSelect from "@/components/ui/vSelect";
import {form_list_entities, getFormListEntities, getFormStepDriver, setFormFiledValue} from "@/hooks/form/useForm";
import {ref} from "vue";
import router from "@/router";
import {useRoute, useRouter} from "vue-router";
import ModalSelect from "@/components/views/drivers/modals/ModalSelect";
import {changeInput, changeRadio} from "@/hooks/app/department";
import toast from "@/use/toast";
export default {
  props:['title','fields','step_id','loading'],
  components: {RadioSelect, VInputModal,VInput, ModalSelect, VSelect, DownloadFiles},
  setup(props,ctx){
    let select = ref({});
    let valIn = ref('');
    let modelVal = ref({});
    let insTruckId = ref(null)
    props.fields?.forEach((e,i)=>{
      if(e.type === 'text' && e.values){
        modelVal.value['text'+i] = e.values[0].value
        if((e.values[0].value === 'Inspected'
            || e.values[0].value === 'Not Inspected'
            || e.values[1].value === 'Inspected'
            || e.values[1].value === 'Not Inspected')
            && !!e.values[1].value){
          if(e.values[1].value === 'Inspected' || e.values[1].value === 'Not Inspected') {
            insTruckId.value = e.values[0].value
            modelVal.value['text'+i] = e.values[1].value
          } else {
            insTruckId.value = e.values[1].value;
            modelVal.value['text' + i] = e.values[0].value;
          }
        }
      }
    })
    function changeRadioLoc(val, field) {
      ctx.emit('update:fields',changeRadio(val,field,props.step_id, props.fields, 'simple'))
    }
    function inspected(val){
      if(insTruckId.value) {
        if (val === '#trailer-inspection-inspect'){
          router.push(`/trailers/${insTruckId.value}`)
        } else if (val === '#truck-inspection-inspect'){
          router.push(`/trucks/${insTruckId.value}`)
        }
      }else {
        toast('not_inspect','info')
      }
    }
    return {
      changeRadioLoc,
      modelVal,
      form_list_entities,
      select,
      changeRadio,
      changeInput,
      valIn, inspected
    }
  }
}
</script>