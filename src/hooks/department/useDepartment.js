import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const department_list = ref();
export const department_by_id = ref();




export async function getAllDepartmentList(obj) {
  try {
     department_list.value  = (await axios.get(`/v1/department/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}${obj?.status_id ? '&status_id='+obj.status_id : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createDepartment(obj) {
  try {
    department_by_id.value  = (await axios.post(`/v1/department/`,obj)).data;
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function getDepartmentById(obj) {
  try {
    department_by_id.value = (await axios.get(`/v1/department/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateDepartmentById(obj) {
  try {
    department_by_id.value  = (await axios.put(`/v1/department/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function deleteDepartmentById(id){
  await axios.delete(`/v1/department/${id}`)
}