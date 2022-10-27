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

export function updateStepStatus(obj){
  return new Promise(((resolve, reject)=>{
    axios.patch(`/v1/step/statuses`, obj).then(data=>{
      resolve(data)
    }).catch(e=>{
      reject(e)
      console.log(e)
    })
  }))
  // try{
  //   let data = await ;
  //   toast('100', 'success');
  //   return data
  // } catch(e) {
  //   toast('400', 'error')
    // console.log(e)
    // return e
  // }
}