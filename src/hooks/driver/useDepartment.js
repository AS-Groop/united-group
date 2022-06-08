import {ref} from "vue";
import axios from "axios";

export const  departments = ref({})
export async function getDepartments(items){
  departments.value = {}
  items.forEach(e=>{
      departments.value[e.alias] = (axios.get(`https://internal.lhbrokerage.com/v1/department/${e.id}`))
    })
}