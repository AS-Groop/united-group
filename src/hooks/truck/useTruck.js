import {computed, ref} from "vue";
import axios from "axios";

export const all_trucks_list = ref(null);
export const truck_by_id = ref(null);




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
  } catch (e) {
    console.log(e)
  }
}


export async function getTruckById(obj) {
  console.log(obj)
  try {
    truck_by_id.value = (await axios.get(`/v1/truck/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}

