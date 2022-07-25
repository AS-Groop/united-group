<template>
  <div class="modal__item">
    <h2 class="text-h2">{{ title }}</h2>
    <template v-for="field in fields">
      <template v-if="field.type === 'textarea'">
        <v-input-modal/>
        <div class="add text-h3">
          <span v-if="field.label ==='Comments'">Add</span>
        </div>
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
import {form_list_entities} from "@/hooks/form/useForm";
import {ref} from "vue";
export default {
  props:['title','fields'],
  components: {RadioSelect, VInputModal,VInput, VSelect, DownloadFiles},
  setup(){
    console.log(form_list_entities.value);
    let select =ref({})
    return {form_list_entities,select}
  }
}
</script>