import {computed, ref} from "vue";
import axios from "axios";
import {getDepartments} from "@/hooks/driver/useDepartment";

export const driver_list = ref();
export const driver_by_id = ref();
export const tabs_content = ref(null);




export async function getDriverList(obj) {
  try {
     driver_list.value  = (await axios.get(`/v1/driver/`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function getDriverById(obj) {
  console.log(obj)
  try {
    driver_by_id.value = (await axios.get(`/v1/driver/${obj}`)).data;
    if(driver_by_id.value && driver_by_id.value.department_statistics) tabs_content.value = driver_by_id.value.department_statistics;
    await getDepartments(driver_by_id.value.department_statistics)
  } catch (e) {
    console.log(e)
  }
}

