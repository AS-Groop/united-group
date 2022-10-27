<template>
  <div class="modal__files">
    <label class="btn btn-lg">
      <label class="btn-content">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M9 14.25C8.8375 14.25 8.70313 14.1969 8.59688 14.0906C8.49063 13.9844 8.4375 13.85 8.4375 13.6875V9.5625H4.3125C4.15 9.5625 4.01563 9.50938 3.90938 9.40313C3.80313 9.29688 3.75 9.1625 3.75 9C3.75 8.8375 3.80313 8.70313 3.90938 8.59688C4.01563 8.49063 4.15 8.4375 4.3125 8.4375H8.4375V4.3125C8.4375 4.15 8.49063 4.01563 8.59688 3.90938C8.70313 3.80313 8.8375 3.75 9 3.75C9.1625 3.75 9.29688 3.80313 9.40313 3.90938C9.50938 4.01563 9.5625 4.15 9.5625 4.3125V8.4375H13.6875C13.85 8.4375 13.9844 8.49063 14.0906 8.59688C14.1969 8.70313 14.25 8.8375 14.25 9C14.25 9.1625 14.1969 9.29688 14.0906 9.40313C13.9844 9.50938 13.85 9.5625 13.6875 9.5625H9.5625V13.6875C9.5625 13.85 9.50938 13.9844 9.40313 14.0906C9.29688 14.1969 9.1625 14.25 9 14.25Z"/>
        </svg>
        Choose File
        <input type="file" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" @change="uploadImage">
      </label>
    </label>
    <template v-for="(i, index) in item[0].values">
      <span class="text-h6" @click="fileDownload(i.value)" v-if="i?.value">
        File {{ index }}
        <svg @click.stop="remove(i.value)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="6.9" transform="rotate(90 10 10)" stroke="#BDBDBD" stroke-width="1.2"/>
          <path d="M13.333 13.3333L6.66634 6.66663" stroke="#BDBDBD" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M13.333 6.66671L6.66634 13.3334" stroke="#BDBDBD" stroke-width="1.2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
    </template>
  </div>
</template>
<script>
import {getFileById, uploadFile} from "@/hooks/file/useFile";
import {onMounted, watch} from "vue";
import {changeInput} from "@/hooks/app/department";

export default {
  props: ['item', 'step_id'],
  setup(props) {
    async function uploadImage(e) {
      let file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      await uploadFile(data).then(data => {
        changeInput(data.file_id, props.item[0], props.step_id, true)
      });
    }

    const remove = (id) => {
      console.log(props.item[0].values.filter(i => i.value !== id))
      props.item[0].values = props.item[0].values.filter(i => i.value !== id);
      changeInput("", props.item[0], props.step_id, true)
      // ctx.emit('update:item', props.item);
    }

    const fileDownload = (value) => getFileById(value).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      console.log(url)
      link.setAttribute('download', 'file.' + response.data.type.split('/')[response.data.type.split('/').length - 1]); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    return {uploadImage, fileDownload, remove}
  }
}
</script>