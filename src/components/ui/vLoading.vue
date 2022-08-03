<template>
  <div class="loading">
    <div class="d-flex align-center justify-center">
      <img src="@/assets/images/loading.gif" alt="">
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.loading{
  background: #ffffff;
  border-radius: 12px;
  max-height: calc(100vh - 116px);
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