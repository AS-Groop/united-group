import {ref} from "vue";
import axios from "axios";

export const driver_list = ref();
export async function getDriverList(obj) {
  try {
    driver_list.value = (await axios.get(`/v1/driver`)).data;
  } catch (e) {
    console.log(e)
  }
  return {driver_list}
}

