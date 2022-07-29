<template>
  <div class="modal__item">
    <h2 class="text-h2">{{ title }}</h2>
    <template v-for="field in fields">
      <template v-if="field.type === 'textarea'">
        <v-input-modal @onChange="(v)=>{changeInput(v,field),valIn = v}" :inputValue="field.values ?field.values[0].value:''" />
        <div class="add text-h3">
          <span @click="changeCommit(field)" v-if="field.label ==='Comments'">Add</span>
        </div>
      </template>
      <template v-if="field.type === 'text'">
            <v-input v-if="field.type === 'text'" class-name="mb-15" :place="field.hint"/>
      </template>
      <template v-if="field.type === 'radiogroup'">
        <div class="modal__select">
          <RadioSelect :title="field.name" :name="field.type" />
        </div>
        <div v-if="field.child_fields" class="modal__select">
          <template v-for="i in field.child_fields">
            <v-input v-if="i.type === 'text'" class-name="mb-15" :place="i.hint"/>
          </template>
        </div>
      </template>
      <template v-if="field.type === 'select'">
          <v-select v-if="form_list_entities[field.list_type]"
                    v-model:select="select[field.list_type]" :place="field.name"
                    class-name=""
                    :options="form_list_entities[field.list_type].entities"/>
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
import {form_list_entities, getFormStepDriver, setFormFiledValue} from "@/hooks/form/useForm";
import {ref} from "vue";
import router from "@/router";
import {useRoute, useRouter} from "vue-router";
export default {
  props:['title','fields','step_id','loading'],
  components: {RadioSelect, VInputModal,VInput, VSelect, DownloadFiles},
  setup(props,ctx){
    console.log(form_list_entities.value);
    let select =ref({})
    let valIn =ref('')
    function changeInput(val,filed){
      let obj = {
        field_id: filed.id,
        step_id: props.step_id,
        driver_id: router.currentRoute.value.params.id,
        values:[
            val
        ]
      }
      if(filed.label !=='Comments') setFormFiledValue(obj)
    }

    async function changeCommit(filed){
      ctx.emit('loading',true)
      let obj = {
        field_id: filed.id,
        step_id: props.step_id,
        driver_id: router.currentRoute.value.params.id,
        values:[
          valIn.value
        ]
      }
      await setFormFiledValue(obj);
      let obj2 = {
        driver_id: router.currentRoute.value.params.id,
        step_id: props.step_id
      };
      await getFormStepDriver(obj2).then(e=>{
        console.log(e)
        ctx.emit('loading',false)
      })
    }
    return {form_list_entities,select,changeInput,changeCommit,valIn}
  }
}
</script>