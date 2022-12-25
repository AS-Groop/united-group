import {ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";


export const form_driver_step = ref(null);
export const form_list_entities = ref({});

export async function getFormStepDriver(obj) {
  form_driver_step.value = {}
  try {
    form_driver_step.value = (await axios.get(`/v1/form/step-driver/${obj.step_id}/${obj.driver_id}`)).data
  } catch (e) {
    console.log(e)
  }
}

export async function getFormListEntities(obj){
  form_list_entities.value[obj.entities] = {}
  try{
    form_list_entities.value[obj.entities] = (await axios.get(`/v1/form/entities?entity_type=${obj.entities}${obj?.limit ? '&limit=' + obj.limit : '&limit=20'}${obj?.page ? '&page=' + obj.page : ''}${obj?.search ? '&search=' + obj.search : ''}`)).data;
  } catch (e){
    console.log(e)
  }
}

export async function setFormFiledValue(obj){
  try {
    await axios.put(`v1/form/field/set`, obj)
    toast('100', 'success');
  } catch (e){
    toast('400','success')
  }
}


