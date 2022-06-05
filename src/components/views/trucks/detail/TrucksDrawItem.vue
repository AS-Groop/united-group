<template>

  <div class="trucks__draw-inner">
    <div class="trucks__draw-item">
      <p class="text-h4">{{title}}</p>
      <textarea v-if="area" placeholder="Comment..." class="text-h6"></textarea>
      <div v-else class="trucks__draw-dr" @click="image_draw = true"></div>
    </div>
  </div>

  <teleport to="body">
    <ModalDraw v-if="image_draw" @close="image_draw = false" title="Driver Signature" />
  </teleport>
</template>
<script>
import ModalDraw from "@/components/app/modals/ModalDraw";
import {ref} from "vue";
export default {
  components: {ModalDraw},
  props:['title','area'],
  setup(){
    const image_draw = ref(false);

    return{image_draw}
  }
}
</script>