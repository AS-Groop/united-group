import {computed, ref} from "vue";
import axios from "axios";
import {getSteps} from "@/hooks/driver/useStep";
import toast from "@/use/toast";

export const driver_list = ref();
export const driver_by_id = ref();
export const tabs_content = ref(null);
export const driver_statuses = ref(null);



export function tabsContentPer(){
  let percentage = 1;
  return computed(()=> {
    tabs_content.value?.forEach(e=>percentage = e.percentage < percentage ? e.percentage : percentage)
    return percentage
  })
}


export async function getDriverList(obj) {
  try {
    driver_list.value = (await axios.get(`/v1/driver/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search=' + obj.search : ''}${obj?.company_id ? '&company_id=' + obj.company_id : ''}${obj?.status_id ? '&status_id=' + obj.status_id : ''}`)).data;
    driver_list.value?.drivers?.map(e=>{e.checked = false; return e})
  } catch (e) {
    console.log(e)
  }
}

export function getDriverStatuses() {
  return new Promise((resolve, reject) => {
    axios.get(`/v1/driver/status-statistics`).then(data => {
      resolve(data);
      driver_statuses.value = data.data;
    }).catch(e => {
      reject(e)
    });
  })
}

export async function updateStatusDriver(obj){
  try {
    console.log('driver_id', obj.driver_id, 'Status_id', obj.status_id)
    driver_by_id.value = (await axios.patch(`/v1/driver/status/${obj.driver_id}`, {
      comment: '',
      status_id: obj.status_id
    })).data;
    toast('100','success')
  } catch (e) {
    console.log(e);
    toast('400','error')
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
  try {
    await axios.delete(`/v1/driver/${id}`);
    toast('100', 'success');
  } catch (e) {
    toast('400', 'error');
    console.log(e)
  }
}