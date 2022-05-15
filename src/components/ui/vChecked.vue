<template>
  <div :class="className" @click.stop  class="form-group">
    <input type="checkbox" @click.stop="eventd"  :id="id">
    <label :for="id">{{label}}</label>
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