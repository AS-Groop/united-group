import {computed, ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";

export const all_companys_list = ref(null);
export const company_by_id = ref(null);




export async function getAllCompanyList(obj) {
  try {
     all_companys_list.value  = (await axios
         .get(`/v1/company/${location.query ? location.query + '&' : '?'}limit=${obj?.limit ? obj.limit : 10}&page=${obj?.page ? obj.page : 1}${obj?.search ? '&search='+obj.search : ''}`)).data;
  } catch (e) {
    console.log(e)
  }
}

export async function createCompany(obj) {
  try {
    company_by_id.value  = (await axios.post(`/v1/company/`,obj)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400', 'error')
    console.log(e)
  }
}


export async function getCompanyById(obj) {
  console.log(obj)
  try {
    company_by_id.value = (await axios.get(`/v1/company/${obj}`)).data;
  } catch (e) {
    console.log(e)
  }
}


export async function updateCompanyById(obj) {
  try {
    company_by_id.value  = (await axios.put(`/v1/company/${obj.id}`,obj.data)).data;
    toast('100', 'success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}


export async function deleteCompanyById(id) {
  try {
    await axios.put(`/v1/company/${id}`,);
    toast('100','success')
  } catch (e) {
    toast('400','error')
    console.log(e)
  }
}

