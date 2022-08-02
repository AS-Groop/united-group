<template>
  <div class="modal__item">
    <h2 class="text-h2">{{ name }}</h2>
    <div class="modal__select">
      <div class="modal__select-radio input">
        <input type="text" @input="getFormListEntities({entities: listType,search:$event.target.value})" placeholder="Search name" >
<!--        <input id="text" type="radio"/>-->
<!--        <label for="text" class="label"></label>-->
      </div>
    </div>
    <div class="modal__select" v-if="form_list_entities && form_list_entities[listType] && form_list_entities[listType].entities?.length">
      <RadioSelect @radioChange="()=>$emit('radioChange',i.id)" :name="listType" v-for="i in form_list_entities[listType].entities" :radio-checked="listValue && i.id === listValue[0]?.value" :title="i.name"/>
    </div>
    <div v-else class="modal_select">
      NOT LIST
    </div>
  </div>
</template>
<script>
import RadioSelect from "@/components/views/drivers/modals/RadioSelect";
import {getFormListEntities} from "@/hooks/form/useForm";
import {form_list_entities} from "@/hooks/form/useForm";
export default {
  props:['name','listType','listValue'],
  components: {RadioSelect},
  setup(props){
    console.log(form_list_entities.value)
    return{
      form_list_entities,
      getFormListEntities
    }
  }
}
</script>
<style scoped>
.modal__select{
  max-height: 130px !important;
}
</style>