<template>
<div class="form__control" :class="className">
  <h4 class="text-h4">{{ label }}</h4>
  <input class="control__input" :type="type ? type :'text'" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="place" :disabled="disabled">
  <slot></slot>
</div>
</template>
<script>
export default {
  props:['className', 'label','place', 'type', 'disabled','modelValue']
}
</script>