<template>
  <label class="modal__select-radio">
    <span class="text-h3">{{ title }}</span>
    <input type="radio" @change="$emit('radioChange',$event.target.checked)" :checked="radioChecked" :name="name"/>
    <span class="label"></span>
  </label>
</template>
<script>
import {watch} from "vue";
import login from "@/views/login";

export default {
  props:['title','name','radioChecked'],
  setup(props){
  }
}
</script>