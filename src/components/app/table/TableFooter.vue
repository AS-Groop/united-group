<template>
  <div class="table__footer">
    <div class="text-h6 d-flex align-center">Show
      <Multiselect
          v-model="limit"
          @update:modelValue="$emit('update:limit',limit)"
          :options="options"
          :canClear="false"
      />
      <p class="mx-1 table_select">
      </p>
      records</div>
    <v-pagination
        :pages='pages'
        v-model:page='page' @update:page="(val)=>{$emit('update:page',val)}" />
    <div class="text-h6">{{ count || 0 }} recordes</div>
  </div>
</template>
<script>
import VPagination from "@/components/ui/vPagination";
import Multiselect from '@vueform/multiselect';
export default {
  components: {VPagination,Multiselect},
  props:['page', 'pages', 'count', 'limit'],
  data() {
    return {
      value: 6,
      options: [
        '10',
        '15',
        '20',
      ]
    }
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
.multiselect{
  width: 60px;
  min-height: 24px;
  position: absolute;
  left: 55px;
  z-index: 1;
  &.is-active,&.is-open{
    box-shadow: none;
    z-index: 111;
  }
  .multiselect-dropdown{
    max-height: 42px;
  }
  .multiselect-caret{
    margin-right: 4px;
  }
  .multiselect-multiple-label, .multiselect-placeholder, .multiselect-single-label {
    padding: 3px 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 18;
    color: #4C4357;
  }
  .multiselect-option{
    padding: 3px 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 18;
    color: #4C4357;
  }
  .multiselect-option.is-selected.is-pointed{
    background: #2F80ED;
  }
  .multiselect-option.is-selected{
    background: #2F80ED;
  }
}
.table_select{
  position: relative;
  width: 70px;
  z-index: 1;
}
</style>