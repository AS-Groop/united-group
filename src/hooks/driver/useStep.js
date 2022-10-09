import {ref} from "vue";
import axios from "axios";

export const steps = ref(null);
export async function getSteps(id,items){
  steps.value = {};
  items.forEach(e => {
      axios.get(`https://internal.lhbrokerage.com/v1/step/${e.id}/${id}`).then(res=>{
        steps.value[e.alias] = res.data;
          steps.value[e.alias].steps.forEach(e => {
              if(e.status.alias === 'completed')e.steps.map(i => i.checked = true)
              else e.steps.map(i => i.checked = false)
          });
          // console.log(steps.value[e.alias].steps)
      })

  });
}