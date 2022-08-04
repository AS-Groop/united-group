<template>
  <div class="modal__files">
    <label class="btn btn-lg">
      <label class="btn-content">
        <svg  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 14.25C8.8375 14.25 8.70313 14.1969 8.59688 14.0906C8.49063 13.9844 8.4375 13.85 8.4375 13.6875V9.5625H4.3125C4.15 9.5625 4.01563 9.50938 3.90938 9.40313C3.80313 9.29688 3.75 9.1625 3.75 9C3.75 8.8375 3.80313 8.70313 3.90938 8.59688C4.01563 8.49063 4.15 8.4375 4.3125 8.4375H8.4375V4.3125C8.4375 4.15 8.49063 4.01563 8.59688 3.90938C8.70313 3.80313 8.8375 3.75 9 3.75C9.1625 3.75 9.29688 3.80313 9.40313 3.90938C9.50938 4.01563 9.5625 4.15 9.5625 4.3125V8.4375H13.6875C13.85 8.4375 13.9844 8.49063 14.0906 8.59688C14.1969 8.70313 14.25 8.8375 14.25 9C14.25 9.1625 14.1969 9.29688 14.0906 9.40313C13.9844 9.50938 13.85 9.5625 13.6875 9.5625H9.5625V13.6875C9.5625 13.85 9.50938 13.9844 9.40313 14.0906C9.29688 14.1969 9.1625 14.25 9 14.25Z"/>
        </svg>
        Choose File
        <input type="file"  @change="uploadImage">
      </label>
    </label>
  </div>
</template>
<script>
import {uploadFile} from "@/hooks/file/useFile";

export default {
  setup(props){
    async function uploadImage(e) {
      let file = e.target.files[0];
      // let image = this.$refs.images;
      const data = new FormData();
      data.append('file', file);
      let test = await uploadFile(data);
      console.log(test.value)
      // image.src = this.$store.getters.getImages ? this.$store.getters.getImages[0].file : ''
    }
    return {uploadImage}
  }
}
</script>