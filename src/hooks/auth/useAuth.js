import axios from "axios";
import {computed, ref} from "vue";
import router from "@/router";
import toast from "@/use/toast";

export const access_token = ref();
export const refresh_token = ref();
export const get_dashboard = ref()

    refresh_token.value = computed(()=>{return localStorage.getItem('refresh_token') || []});
access_token.value = computed(()=>{return localStorage.getItem('refresh_token') || []});

export async function useAuth (obj){
  try {
    const response = (await axios.post(`/v1/auth/login`, obj)).data;
    localStorage.setItem('access_token',response.access_token);
    localStorage.setItem('refresh_token',response.refresh_token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
    console.log(router)
    router.push('/')
  } catch (e) {
    toast('400','error')
    console.log('res',e)
  }
}

export async function getDashboard(){
  try {
    get_dashboard.value = (await axios.get('/v1/dashboard/')).data;
  } catch (e) {
    console.log(e)
    toast('400','error')
  }
}

// export default {access_token, refresh_token, get_dashboard, useAuth}



