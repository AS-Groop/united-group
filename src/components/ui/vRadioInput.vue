<template>
  <div class="d-inline-block" :class="className">
    <label class="radio__input">
      <input :name="name" type="radio" :checked="vChecked"/>
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