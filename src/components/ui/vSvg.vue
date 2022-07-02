<template>
  <svg  :width="width" :height="height" :class="className" >
    <use :xlink:href="require('@/icons/sprite.svg')+'#icon-'+id">
    </use>
  </svg>
</template>
<script>
export default {
  props:['id','width','height','className'],
  mounted() {
    console.log()
  }
}
</script>

<style lang="scss">
svg{
  use{
    svg{
    }
  }
}
</style>