<template>
  <div class="form__input">
    <v-svg id="pen" width="25" height="24" v-if="pen && !!!val" />
    <input type="text" @change="$emit('onChange',$event.target.value)" @focus="pen=false" class="text-h3" v-model="val"  @focusout="pen = true" placeholder="" />
  </div>
</template>

<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['inputValue'],
  data(){
    return{
      pen: true,
      val: '',
    }
  },
  mounted() {
        this.val = this.inputValue;
    }
}
</script>