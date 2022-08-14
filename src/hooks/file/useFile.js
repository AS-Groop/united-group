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
