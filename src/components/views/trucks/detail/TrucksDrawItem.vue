<template>

  <div class="trucks__draw-inner">
    <div class="trucks__draw-item">
      <p class="text-h4">{{title}}</p>
      <textarea v-if="area" placeholder="Comment..." class="text-h6"></textarea>
      <div v-else class="trucks__draw-dr"></div>
    </div>
  </div>

</template>
<script>
export default {
  props:['title','area']
}
</script>