<template>

  <div class="trucks__draw-inner">
    <div class="trucks__draw-item">
      <p class="text-h4">{{title}}</p>
      <textarea v-if="area" :disabled="disabled" v-model="modelValue" @update:modelValue="$emit('update:modelValue',modelValue)" placeholder="Comment..." class="text-h6"></textarea>
      <div v-else class="trucks__draw-dr" ref="img" @click="image_draw = true"></div>
    </div>
  </div>

  <teleport to="body">
    <ModalDraw :id="id" v-model:data_target="data_target" @update:data_target="val=>$emit('update:data_target',val)" v-if="image_draw" @close="image_draw = false" :title="title" />
  </teleport>
</template>
<script>
import ModalDraw from "@/components/app/modals/ModalDraw";
import {onMounted, ref, watch} from "vue";
import {getFileById} from "@/hooks/file/useFile";
export default {
  components: {ModalDraw},
  props:['title','area','id','data_target','disabled','modelValue'],
  setup(props){
    const image_draw = ref(false);
    const img = ref(null);
    const getImage = ()=> {
      if (props.id && props.data_target[props.id]) getFileById(props.data_target[props.id]).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const Img = new Image();
        Img.src = url;
        img.value.innerHTML = '';
        img.value.appendChild(Img);
      });
    }
    onMounted(()=>getImage())
    watch(props.data_target, () => {
      getImage();
    });
    return{image_draw,img}
  }
}
</script>