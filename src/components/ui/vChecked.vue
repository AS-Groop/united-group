<template>
  <div :class="className" @click.stop  class="form-group">
    <input type="checkbox" @click.stop="eventd" :checked="check" :id="id">
    <label :for="id">{{label}}</label>
  </div>
</template>
<script>
export default {
  name:'vChecked',
  props:['id','label', 'className','check'],
  methods:{
    eventd(e){
      this.$emit('clickCheck')
      this.$emit('update:check',e.target.checked)
    }
  }
}
</script>