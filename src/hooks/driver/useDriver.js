import {computed, ref} from "vue";
import axios from "axios";
import {getSteps} from "@/hooks/driver/useStep";
import toast from "@/use/toast";

export const driver_list = ref();
export const driver_by_id = ref();
export const tabs_content = ref(null);




export async function getDriverList(obj) {
  try {
    driver_list.value = (await axios.get(`/v1/driver/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search=' + obj.search : ''}${obj?.company_id ? '&company_id=' + obj.company_id : ''}`)).data;
    driver_list.value.drivers.map(e=>{e.checked = false; return e})
  } catch (e) {
    console.log(e)
  }
}

export async function createDriver(obj) {
  try {
    driver_by_id.value  = (await axios.post(`/v1/driver/`,obj)).data;
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function getDriverById(obj) {
  console.log(obj)
  try {
    driver_by_id.value = (await axios.get(`/v1/driver/${obj}`)).data;
    if(driver_by_id.value && driver_by_id.value.department_statistics) tabs_content.value = driver_by_id.value.department_statistics;
    // await getSteps(driver_by_id.value.id, driver_by_id.value.department_statistics)
  } catch (e) {
    console.log(e)
  }
}


export async function updateDriverById(obj) {
  try {
    driver_by_id.value  = (await axios.put(`/v1/driver/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function deleteDriverById(id){
  await axios.delete(`/v1/driver/${id}`)
}