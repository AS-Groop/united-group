import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_trailers_list = ref(null);
export const trailer_by_id = ref(null);
export const trailer_inspect = ref(null);
export const picks_trailer = ref(null);




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
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
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


export async function updateTrailerById(obj) {
  try {
    trailer_by_id.value  = (await axios.put(`/v1/trailer/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function deleteTrailerById(id) {
  try {
    await axios.put(`/v1/trailer/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}



export async function getTrailerInspect(obj) {
  console.log(obj)
  try {
    trailer_inspect.value = (await axios.get(`/v1/trailer/inspect/${obj.trailer_id}/${obj.driver_id}`)).data;
  } catch (e) {
    console.log(e)
  }
}



export async function picksUpTrailer(obj) {
  try {
    picks_trailer.value  = (await axios.post(`/v1/trailer/inspect`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}