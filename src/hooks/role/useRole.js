import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_roles_list = ref(null);
export const all_role_modules_list = ref(null);
export const role_by_id = ref(null);




export async function getAllRoleList(obj) {
  try {
     all_roles_list.value  = (await axios
         .get(`/v1/role/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 99}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function getAllRoleModulesList(obj) {
  try {
     all_role_modules_list.value  = (await axios
         .get(`/v1/role/modules/`)).data;
        //  .get(`/v1/role/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createRole(obj) {
  try {
    role_by_id.value  = (await axios.post(`/v1/role/`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function getRoleById(obj) {
  console.log(obj)
  try {
    role_by_id.value = (await axios.get(`/v1/role/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateRoleById(obj) {
  try {
    role_by_id.value  = (await axios.put(`/v1/role/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function deleteRoleById(id) {
  try {
    await axios.put(`/v1/role/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}

