<template>
<div class="form__control" :class="className">
  <h4 class="text-h4">{{ label }}</h4>
  <textarea class="control__textarea" :class="{'error':error}" @change="$emit('onChange')" :type="type ? type :'text'" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="place" :disabled="disabled" />
  <slot></slot>
</div>
</template>
<script>
export default {
  name:'vTextarea',
  props:['className', 'label','place', 'error', 'type', 'disabled','modelValue']
}
</script>