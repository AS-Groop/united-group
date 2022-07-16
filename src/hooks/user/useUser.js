import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_users_list = ref(null);
export const user_by_id = ref(null);
export const user_profile = ref(null);




export async function getAllUserList(obj) {
  try {
     all_users_list.value  = (await axios
         .get(`/v1/user/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createUser(obj) {
  try {
    user_by_id.value  = (await axios.post(`/v1/user/`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function getUserById(obj) {
  try {
    user_by_id.value = (await axios.get(`/v1/user/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateUserById(obj) {
  try {
    user_by_id.value  = (await axios.put(`/v1/user/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}



export async function getUserProfile(id) {
  try {
    user_profile.value = (await axios.get(`/v1/user/profile/${id}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateUserProfile(obj) {
  try {
    user_profile.value = (await axios.get(`/v1/user/profile/${obj.id}`,obj.data)).data;
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}



export async function deleteUserById(id) {
  try {
    await axios.put(`/v1/user/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}

