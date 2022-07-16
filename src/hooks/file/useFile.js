import toast from "@/use/toast";
import axios from "axios";
import { ref } from "vue";



const getFile = ref(null)

export async function uploadFile(file){
	try{
		getFile.value = (await axios.post(`/v1/file/`,file)).data
		toast('100','success')
	} catch(e){
		toast('400','error')
	}
}



export async function getFileById(id){
	try{
		getFile.value = (await axios.post(`/v1/file/${id}`)).data
		toast('100','success')
	} catch(e){
		toast('400','error')
	}
}