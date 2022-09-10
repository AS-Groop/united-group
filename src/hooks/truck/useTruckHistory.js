import {ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_trucks_history_list = ref(null);
export const truck_history_by_id = ref(null);
export const truck_history_inspect = ref(null);
export const truck_history_inspect_id = ref(null);




export async function getAllTrucksHistoryList(obj) {
  try {
    all_trucks_history_list.value = (await axios
        .get(`/v1/truck/inspection-history${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search=' + obj.search : ''}${obj?.status_id ? '&status_id=' + obj.status_id : ''}`)).data;
    all_trucks_history_list.value.trucks.map(e=>{e.checked = false; return e})
  } catch (e) {
    console.log(e)
  }
}


export async function updateTruckHistoryById(obj) {
  try {
      truck_history_by_id.value  = (await axios.put(`/v1/truck/inspection-history/${obj.id}`,obj.data)).data;
    toast('100','success')
  } catch (e) {
    toast('100','error')
    console.log(e)
  }
}

export async function deleteTruckHistoryById(id){
  try {
    await axios.delete(`/v1/truck/inspection-history/${id}`)
    toast('100','success')
  } catch (e){
    toast('400','error');
    console.log(e)
  }
}



export async function getTruckInspectHistory(obj) {
  truck_history_inspect_id.value=null;
  try {
    truck_history_inspect_id.value = (await axios.get(`/v1/truck/inspection-history/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


