<template>
  <div class="modal__check-item">
    <label class="text-h3">
      <input type="checkbox" @change="$emit('onChange',$event.target.checked)" :checked="checked">
      <span></span>
      <p>{{ name }}</p>
    </label>
  </div>
</template>

<script>
export default {
  props:['name','id','checked'],
};
</script>