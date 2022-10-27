import {ref} from "vue";
import axios from "axios";

export const steps = ref({});
export const my_steps = ref({});
export async function getSteps(id,item){
  // steps.value = {};
  // my_steps.value = {};
  // items.forEach(n => {
      axios.get(`https://internal.lhbrokerage.com/v1/step/${item.id}/${id}`).then(res=>{
        steps.value[item.alias] = res.data;
        my_steps.value[item.alias] = [];
        steps.value[item.alias].steps.forEach(e => {
          if (e.status.alias === 'completed') e.steps.map(i => {
            i.checked = true;
            my_steps.value[item.alias].push(i);
            return i;
          })
          else e.steps.map(i => {
            i.checked = false;
            my_steps.value[item.alias].push(i);
            return i;
          })
        });
        // console.log(steps.value[e.alias].steps)
      })

  // });
}