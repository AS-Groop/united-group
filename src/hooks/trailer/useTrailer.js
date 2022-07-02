import {computed, ref} from "vue";
import axios from "axios";

export const all_trailers_list = ref(null);
export const trailer_by_id = ref(null);




export async function getAllTrailersList(obj) {
  try {
     all_trailers_list.value  = (await axios
         .get(`/v1/trailer/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}${obj?.status_id ? '&status_id='+obj.status_id : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createTrailer(obj) {
  try {
    trailer_by_id.value  = (await axios.post(`/v1/trailer/`,obj)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function getTrailerById(obj) {
  console.log(obj)
  try {
    trailer_by_id.value = (await axios.get(`/v1/trailer/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}

