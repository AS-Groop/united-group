import toast from "@/use/toast";
import axios from "axios";
import { ref } from "vue";



const getFile = ref(null)
const fetchFile = ref(null)

export async function uploadFile(file){
	try{
		// console.log('file',file)
		fetchFile.value = (await axios.post(`/v1/file/`, file)).data;
		toast('100','success')
		return fetchFile.value;
	} catch(e){
		toast('400','error')
	}
}
export async function returnsJobStatus(id){
	return new Promise(((resolve, reject) => {
		axios.get(`/v1/file/zip/a4423b00-6ffb-474c-bbae-ddf2d6fea821`).then(data=> {
			resolve(data)
		}).catch(err=>{
			reject(err)
			console.log(err)
			toast('400','error')
		})
	}))
}

export async  function generatesZip(obj){
	return new Promise(((resolve, reject) => {
		axios.put(`/v1/file/zip`,obj).then(data=> {
			resolve(data)
		}).catch(err=>{
			reject(err)
			console.log(err)
			toast('400','error')
		})
	}))
}



export function getFileById(id){
	return new Promise(((resolve, reject) => {
		axios({
			url: `/v1/file/${id}`, //your url
			method: 'GET',
			responseType: 'blob',} // important
			).then(data=> {
			resolve(data)
		}).catch(err=>{
			reject(err)
			console.log(err)
			toast('400','error')
		})
	}))

}
