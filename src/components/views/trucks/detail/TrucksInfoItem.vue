<template>
  <div class="trucks__info-item">
    <div class="trucks__info-inner">
      <div class="title text-h4">{{ title }}</div>
      <div class="value text-h4">{{ value }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props:['title', 'value']
}
</script>