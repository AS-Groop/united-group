<template>
    <v-pagination
        v-model="page"
        :pages="pages"
        :range-size="1"
        active-color="#2F80ED"
        hide-first-button
        hide-last-button
        @update:modelValue="val=>$emit('update:page',val)"
    />
</template>
<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  components:{VPagination},
  props:{
    page:[Number],
    pages:[Number],
  },
  methods:{
    updateHandler(e){
      // this.
    }
  }
}
</script>

<style lang="scss">
.Page {
  width: 24px;
  height: 24px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  border: 1px solid #E0E0E0;

  &:hover{
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  &.Page-active {
    color: #ffffff;
  }
}
.PaginationControl {
  //position: relative;
  &:before {
    content: '';
    border-style: solid;
    border-width:6px;
    border-top-color: #fff;
    border-left-color: #fff;
    border-right-color: #2F80ED;
    border-bottom-color: #2F80ED;
    border-radius: 2px 4px 1px;
    transform: translate(7px) rotate(-45deg);
  }
  &:first-child{
    &:before{
      transform: translate(14px) rotate(135deg);
    }
  }
  .Control{
    opacity:0;
  }
  .Control-active{
    opacity:0;
  }
}
</style>