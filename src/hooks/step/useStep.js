import toast from "@/use/toast";
import axios from "axios";
import { ref } from "vue";



const step_status_list = ref(null)


export async function getStepStatuses(){
  try{
    step_status_list.value = (await axios.get(`/v1/step/statuses/`)).data
  } catch(e){
    console.log(e)
  }
}

export async function updateStepStatus(obj){
  try{
    await axios.patch(`/v1/step/statuses`, obj);
    toast('100','success')
  } catch(e){
    toast('400', 'error')
    console.log(e)
  }
}