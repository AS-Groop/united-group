<template>
  <label class="trucks__pick-inputs">
    <span class="wrapper"><b class="text-h0">+{{ count || 0 }}</b> <span class="text-h2-med"> {{ title }} </span></span>
    <div v-if="img" class="img" ref="div">
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
  setup(props){
    const setImages = ref(null);
    const div = ref(null);
    if(props.img)getFileById(props.img).then((response) => {
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
    return{
      setImages,
      div,
    }
  }
}
</script>