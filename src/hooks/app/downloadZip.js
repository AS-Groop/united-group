import {generatesZip, getFileById, returnsJobStatus} from "@/hooks/file/useFile";

const fileDownload = (value) => getFileById(value).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    console.log(url)
    link.setAttribute('download', 'file.zip'); //or any other extension
    document.body.appendChild(link);
    link.click();
})

const jobStatus = (id)=>{
    returnsJobStatus(id).then(
        res=>{
            if(res.data.file_status === 'init'){
                setTimeout(()=>{
                    jobStatus(id)
                },3000)
            } else if(res.data.file_status === 'in_process') {
                setTimeout(()=>{
                    jobStatus(id)
                },1000)
            } else if(res.data.file_status === 'finish') {
                fileDownload(res.data.file_id)
            }
        }
    )
}

export async function downloadZip(id,type){
    await generatesZip({
        entity_id: id,
        entity_type: type
    }).then(data=>{
        jobStatus(data.data.request_id)
    })
}