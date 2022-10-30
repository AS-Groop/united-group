<template>
  <div class="d-inline-block" :class="className">
    <label class="radio__input">
      <input @change="$emit('myChange',$event)" :name="name" type="radio" :checked="vChecked" :value="value"/>
      <span class="label"></span>
      <span class="text-h3">{{label}}</span>
    </label>
  </div>

</template>
<script>
export default {
  name:'vRadioInput',
  props:['label','className', 'name', 'value','vChecked']
}
</script>