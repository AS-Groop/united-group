<template>
  <div class="modal__check-item">
    <label class="text-h3">
      <input type="checkbox">
      <span></span>
      <p>{{ name }}</p>
    </label>
  </div>
</template>

<script>
export default {
  props:['name']
};
</script>