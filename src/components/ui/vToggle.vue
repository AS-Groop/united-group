<template>
  <div :class="className" @click.stop  class="form-toggle">
    <input type="checkbox" @click.stop="eventd"  :id="id">
    <label :for="id"></label>
  </div>
</template>
<script>
export default {
  props:['id','label', 'className'],
  methods:{
    eventd(e){
      console.log(e.target)
    }
  }
}
</script>