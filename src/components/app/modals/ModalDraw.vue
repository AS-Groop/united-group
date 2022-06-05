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
          <v-btn type="100">Save</v-btn>
          <v-btn type="100">Save</v-btn>
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
import {ref} from "vue";
export default {
  components: {LoadPhotoItem, CheckListItem, VBtn, VSvg,VueDrawingCanvas},
  props: ['title'],
  setup(){

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
     async function  setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await VueCanvasDrawing.redraw();
    }
     async function  setWatermarkImage(event) {
      let URL = window.URL;
      this.watermark = {
        type: "Image",
        source: URL.createObjectURL(event.target.files[0]),
        x: 0,
        y: 0,
        imageStyle: {
          width: 600,
          height: 400,
        },
      };
      await VueCanvasDrawing.redraw();
    }

    const getCoordinate = (event) => {
      // console.log(VueCanvasDrawing.value)
      console.log(image.value)
      let coordinates = VueCanvasDrawing.value.getCoordinates(event);
      x = coordinates.x;
      y = coordinates.y;
    };
    return {
      initialImage,
      image,


      VueCanvasDrawing,
      getCoordinate,
    }
  }

}
</script>