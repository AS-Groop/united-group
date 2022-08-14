<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__load-photo">
      <div class="modal__body">
        <div class="title text-h1">
          {{title}} <v-svg @click="$emit('close')" id="close" width="30" height="30"/>
        </div>
        <div class="modal__load-body">
          <vue-drawing-canvas
              ref="VueCanvasDrawing"
              v-model:image="image"
              :width="686"
              :height="300"
              stroke-type="dash"
              line-cap="square"
              line-join="miter"
              :fill-shape="false"
              :eraser="false"
              :lineWidth="2"
              color="#000000"
              background-color="#fff"
              :initial-image="initialImage"
              saveAs="png"
              :styles="{
            border: 'solid 1px #e0e0e0',
            borderRadius: '14px',
            backgroundColor:'#fbfbfb',
            width: '100%',
            height: '300px'
          }"
              :lock="false"
              @mousemove="getCoordinate($event)"
              :additional-images="[]"
          />
        </div>
        <div class="save_btn">
          <v-btn type="100" style="margin-right: 15px;" @click="save">Save</v-btn>
          <v-btn type="100" @click="$emit('close')">Cancel</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import VBtn from "@/components/ui/vBtn";
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import LoadPhotoItem from "@/components/app/modals/modal-load-photo/LoadPhotoItem";
import VueDrawingCanvas from "vue-drawing-canvas";
import {computed, ref} from "vue";
import {uploadFile} from "@/hooks/file/useFile";
export default {
  components: {LoadPhotoItem, CheckListItem, VBtn, VSvg,VueDrawingCanvas},
  props: ['title','data_target','id'],
  setup(props, ctx) {

    const initialImage = ref([
      {
        type: "dash",
        from: {
          x: 262,
          y: 154,
        },
        coordinates: [],
        color: "#000000",
        width: 5,
        fill: false,
      },
    ]);
    let x = 0;
    let y = 0;
    let image = ref("");

    const VueCanvasDrawing = ref(null)
    const getCoordinate = (event) => {
      // console.log(VueCanvasDrawing.value)
      let coordinates = VueCanvasDrawing.value.getCoordinates(event);
      x = coordinates.x;
      y = coordinates.y;
    };

    const textFile = computed(()=>image.value);
    const save = ()=> {
      fetch(textFile.value)
          .then(res => res.blob())
          .then(blob => {
            const fd = new FormData();
            const fil = new File([blob], "filename.jpeg");
            fd.append('file', fil)
            uploadFile(fd).then(data => {
              props.data_target[props.id] = props.data_target[props.id] || '';
              props.data_target[props.id] = data.file_id;
              ctx.emit('update:data_target', props.data_target)
              console.log(props.data_target);
            });
          }).then(e=>{ctx.emit('close')})
    }
    return {
      initialImage,
      image,
      save,


      VueCanvasDrawing,
      getCoordinate,
    }
  }

}
</script>