<template>
  <div class="form__control" :class="className">
    <h4 class="text-h4">{{ label }}</h4>
    <div class="form__select" @click="!!!disabled ? drop = !drop :''"
         :class="{ 'place': !select, 'disabled': disabled, 'error':error }">
      {{select ? select[name || 'name'] : place }}
      <v-svg :class-name="{'active': options && drop}"  id="select-arrow"  width="24" height="24"/>
      <div v-if="options && drop" class="wrapper"></div>
      <div v-if="options && drop" class="form__select-options">
        <div class="form__select-item text-h3"
             :class="{'active': select && (select[id||'id']===item[id || 'id'])}"
             v-for="item in options"
             @click="selectItem(item)"
        >
          {{ item[name || 'name'] }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
import {ref} from "vue";
export default {
  components: {VSvg},
  props: ['className', 'label', 'place', 'error', 'disabled', 'select', 'name', 'options','id'],
  setup(props,ctx){
    const selectItem = (item) => {
      ctx.emit('update:select',item)
    };

    const drop = ref(false)

    return{selectItem, drop}
  }
}
</script>