<template>
<div class="form__control" :class="className">
  <h4 class="text-h4">{{ label }}</h4>
  <input type="text" :placeholder="place" :disabled="disabled">
</div>
</template>
<script>
export default {
  props:['className', 'label','place', 'disabled']
}
</script>