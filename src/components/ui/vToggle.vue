<template>
  <div :class="className" @click.stop  class="form-toggle">
    <input type="checkbox" @click.stop="eventd" :checked="check" :id="id">
    <label :for="id"></label>
  </div>
</template>
<script>
export default {
  name:'vToggle',
  props:['id','label', 'className','check'],
  methods:{
    eventd(e){
      // console.log(e.target.checked);
      this.$emit('check',e.target.checked)
    }
  }
}
</script>