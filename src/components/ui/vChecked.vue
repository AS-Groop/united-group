<template>
  <div :class="className" @click.stop  class="form-group">
    <input type="checkbox" @click.stop="eventd" :checked="check" :id="id">
    <label :for="id">{{label}}</label>
  </div>
</template>
<script>
export default {
  props:['id','label', 'className','check'],
  methods:{
    eventd(e){
      this.$emit('clickCheck')
    }
  }
}
</script>