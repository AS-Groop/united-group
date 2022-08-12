import toast from "@/use/toast";
import axios from "axios";
import { ref } from "vue";



const getFile = ref(null)
const fetchFile = ref(null)

export async function uploadFile(file){
	try{
		fetchFile.value = (await axios.post(`/v1/file/`, file)).data;
		toast('100','success')
	} catch(e){
		toast('400','error')
	}
}



export  function getFileById(id,data,conf){
	return new Promise((resolve, reject)=>{
		axios.get(`/v1/file/${id}`,data,conf)
			.then(res=>resolve(res))
			.catch((err)=>reject(err))
	})
}