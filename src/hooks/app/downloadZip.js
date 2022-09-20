import {generatesZip, getFileById, returnsJobStatus} from "@/hooks/file/useFile";

const fileDownload = (value) => getFileById(value).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    console.log(url)
    link.setAttribute('download', 'file.' + response.data.type.split('/')[response.data.type.split('/').length - 1]); //or any other extension
    document.body.appendChild(link);
    link.click();
})

export async function downloadZip(id,type){
    await generatesZip({
        entity_id: id,
        entity_type: type
    }).then(data=>{
        returnsJobStatus(data.request_id).then(
            id=>{
                fileDownload(id.data.file_id)
            }
        )
    })
}