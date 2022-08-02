<template>
  <div class="loading">
    <div class="d-flex align-center justify-center">
      <img src="@/assets/images/loading.gif" alt="">
    </div>
  </div>
</template>

<script>

</script>
<style lang="scss" scoped>
.loading{
  background: #f5f5f5;
  &>div {
    width: 100%;
    height: 100%;
    z-index: 9999;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>