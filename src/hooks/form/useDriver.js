import {ref} from "vue";
import axios from "axios";


export const form_driver_step = ref(null);

export async function getFormStepDriver(obj) {
  form_driver_step.value = {}
  try {
    form_driver_step.value = (await axios.get(`/v1/form/step-driver/${obj.step_id}/${obj.driver_id}`)).data
  } catch (e) {
    console.log(e)
  }
}



