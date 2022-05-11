<template>
  <div class="form-group">
    <input type="checkbox" :id="id">
    <label :for="id">{{label}}</label>
  </div>
</template>
<script>
export default {
  props:['id','label']
}
</script>