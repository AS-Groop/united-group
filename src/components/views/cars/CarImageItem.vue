<template>
  <div class="img" ref="imgContent">
    <!--    <img src="@/assets/images/car1.png" alt="">-->
  </div>
</template>
<script>
import {ref} from "vue";
import {getFileById} from "@/hooks/file/useFile";

export default {
  props: ['img'],
  setup(props){
    const imgContent = ref(null)

    if(props.img)getFileById(props.img).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const Img = new Image();
      Img.src = url;
      imgContent.value.appendChild(Img)
    });
    return{imgContent}
  }
}
</script>
