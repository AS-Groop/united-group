<template>
  <label class="trucks__pick-inputs">
    <span class="wrapper"><b class="text-h0">+{{ count || 0 }}</b> <span class="text-h2-med"> {{ title }} </span></span>
    <div class="img" ref="div">
    </div>
    <v-svg :id="svg" width="106" height="106"/>
  </label>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {onMounted, ref} from "vue";
import {getFileById} from "@/hooks/file/useFile";
export default {
  components: {VSvg},
  props:['img','svg','title','count'],
  setup(){
    const setImages = ref(null);
    const div = ref(null);
    onMounted(()=>{
      getFileById('0727b29d-9595-48f7-aad4-0dde0eb94af1').then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const Img = new Image();
        Img.src = url;
        div.value.innerHTML = '';
        div.value.appendChild(Img)
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.jpeg'); //or any other extension
        // document.body.appendChild(link);
        // link.click();
      });
    })
  // const test = ()=>
    return{
      setImages,
      div,
    }
  }
}
</script>