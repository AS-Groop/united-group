import {ref} from "vue";
import axios from "axios";

export const steps = ref({});
export async function getSteps(id,items){
  steps.value = {};
  items.forEach(e => {
      axios.get(`https://internal.lhbrokerage.com/v1/step/${e.id}/${id}`).then(res=>{
        steps.value[e.alias] = res.data
      })

  });
}