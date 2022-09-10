import { ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_trailers_history_list = ref(null);
export const trailer_history_by_id = ref(null);
export const picks_trailer_history = ref(null);
export const trailer_history_inspect_id = ref(null);




export async function getAllTrailersHistoryList(obj) {
  try {
     all_trailers_history_list.value  = (await axios
         .get(`/v1/trailer/inspection-history${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}${obj?.status_id ? '&status_id='+obj.status_id : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}



export async function updateTrailerHistoryById(obj) {
  try {
    trailer_history_by_id.value  = (await axios.put(`/v1/trailer/inspection-history/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function deleteTrailerHistoryById(id) {
  try {
    await axios.delete(`/v1/trailer/inspection-history/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}



export async function getTrailerHistoryInspect(obj) {
  trailer_history_inspect_id.value = null;
  try {
    trailer_history_inspect_id.value = (await axios.get(`/v1/trailer/inspection-history/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}

