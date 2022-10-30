import {ref} from "vue";
import axios from "axios";


export const notification_list = ref(null);

export async function getAllNotification(obj){
  try {
    notification_list.value = (await axios.get(`/v1/notification/?limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}`)).data
  } catch (e){
    console.log(e)
  }
}