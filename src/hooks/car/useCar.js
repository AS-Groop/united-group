import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_cars_list = ref(null);
export const car_pick_drop = ref(null);
export const car_by_id = ref(null);
export const car_history_id = ref(null);




export async function getAllCarList(obj) {
  try {
     all_cars_list.value  = (await axios
         .get(`/v1/car/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}
export async function getPickDropCar(obj) {
  car_pick_drop.value = null;
  try {
     car_pick_drop.value  = (await axios
         .get(`/v1/car/${obj.id}/pickup-dropoff`)).data;
     return car_pick_drop.value
  } catch (e) {
    console.log(e)
    return e
  }
}

export async function pickDropCar(obj) {
  car_pick_drop.value = null;
  try {
     car_pick_drop.value  = (await axios
         .post(`/v1/car/${obj.id}/pickup-dropoff`, obj.obj)).data;
    toast('100', 'success')
     return car_pick_drop.value
  } catch (e) {
    toast('400', 'error')
    console.log(e)
    return e
  }
}

export async function getCarHistory(obj){
  try{
    car_history_id.value  = (await axios
        .get(`/v1/car/${obj}/history?limit=999`)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
    return e
  }
}


export async function createCar(obj) {
  try {
    car_by_id.value  = (await axios.post(`/v1/car`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function getCarById(obj) {
  console.log(obj)
  try {
    car_by_id.value = (await axios.get(`/v1/car/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateCarById(obj) {
  try {
    car_by_id.value  = (await axios.put(`/v1/car/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function deleteCarById(id) {
  try {
    await axios.put(`/v1/car/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}

