<template>
  <label class="modal__select-radio">
    <span class="text-h3">{{ title }}</span>
    <input type="radio" :name="name"/>
    <span class="label"></span>
  </label>
</template>
<script>
export default {
  props:['title','name'],
  setup(){
  }
}
</script>