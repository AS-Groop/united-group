import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";
import {trailer_by_id} from "@/hooks/trailer/useTrailer";

export const all_trucks_list = ref(null);
export const truck_by_id = ref(null);
export const truck_inspect = ref(null);
export const truck_inspect_id = ref(null);




export async function getAllTrucksList(obj) {
  try {
     all_trucks_list.value  = (await axios
         .get(`/v1/truck/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}${obj?.status_id ? '&status_id='+obj.status_id : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createTruck(obj) {
  try {
    truck_by_id.value  = (await axios.post(`/v1/truck/`,obj)).data;
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function getTruckById(obj) {
  console.log(obj)
  try {
    truck_by_id.value = (await axios.get(`/v1/truck/${obj}`)).data;
    return truck_by_id.value
  } catch (e) {
    console.log(e)
    return e
  }
}
// export function getTruckById(obj) {
//   console.log(obj)
//   return new Promise((resolve,reject)=>{
//     axios.get(`/v1/truck/${obj}`).then(response => {
//           trailer_by_id.value = response.data;
//           resolve(response.data)
//         }
//         , error => {
//           console.log(error)
//           reject(error)
//         });
//   })
// }


export async function updateTruckById(obj) {
  try {
    truck_by_id.value  = (await axios.put(`/v1/truck/${obj.id}`,obj.data)).data;
    toast('100','success')
  } catch (e) {
    toast('100','error')
    console.log(e)
  }
}

export async function deleteTruckByid(id){
  try {
    axios.delete(`/v1/truck/${id}`)
    toast('100','success')
  } catch (e){
    toast('400','error');
    console.log(e)
  }
}



export async function getTruckInspect(obj) {
  console.log(obj)
  truck_inspect_id.value=null;
  try {
    truck_inspect_id.value = (await axios.get(`/v1/truck/inspect/${obj.truck_id}/${obj.driver_id}`)).data;
  } catch (e) {
    console.log(e)
  }
}



export async function postInspectTruck(obj) {
  try {
    truck_inspect.value  = (await axios.post(`/v1/truck/inspect`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}