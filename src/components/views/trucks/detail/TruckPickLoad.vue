<template>
  <label class="trucks__pick-inputs">
    <span class="wrapper"><b class="text-h0">+{{ count || 0 }}</b> <span class="text-h2-med"> {{ title }} </span></span>
    <img v-if="img" ref="setImg" :src="img" alt="">
    <v-svg :id="svg" width="106" height="106"/>
  </label>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {ref} from "vue";
import {getFileById} from "@/hooks/file/useFile";
export default {
  components: {VSvg},
  props:['img','svg','title','count'],
  setup(){
    const setImg = ref(null);
    const  test = async () => {
      const res = await fetch('https://internal.lhbrokerage.com/v1/file/0727b29d-9595-48f7-aad4-0dde0eb94af1',{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      console.log('res',res)
      const blob = await res.blob()
      console.log('blob',blob)
      const img = new Image()
      setImg.value.src = URL.createObjectURL(blob)
      await img.decode()
      URL.revokeObjectURL(setImg.value.src)
      URL.revokeObjectURL(img.src)
    }
    test();
    getFileById('0727b29d-9595-48f7-aad4-0dde0eb94af1',{},{responseType: 'blob'})
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));

        })
        .catch(() => alert('oh no!'));
    return {setImg};
  }
}
</script>