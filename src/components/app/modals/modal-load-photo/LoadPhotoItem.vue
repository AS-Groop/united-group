<template>
  <div ref="imgContent" class="modal__load-item">
    <div class="remove" @click.stop="$emit('remove')">
      <v-svg id="remove-image" width="30" height="30"/>
    </div>
<!--      <img src="@/assets/images/tires1.png" alt="">-->
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {ref} from "vue";
import {getFileById} from "@/hooks/file/useFile";
export default {
    components: {VSvg},
  props:['image', 'img','img_src'],
  setup(props,ctx){
  const imgContent = ref(null)

    if(props.img)getFileById(props.img).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const Img = new Image();
      Img.src = url;
      imgContent.value.appendChild(Img)
      ctx.emit('update:img_src',url)
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'file.jpeg'); //or any other extension
      // document.body.appendChild(link);
      // link.click();
    });
    return{imgContent}
  }
}
</script>