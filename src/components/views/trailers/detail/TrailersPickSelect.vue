<template>
  <div class="trucks__pick-select">
    <div class="pick-select">
      <div class="title text-h4">{{title}}</div>
      <div class="count text-h4">
        <span>{{count}} select</span>
        <v-svg id="arrow-select" width="20" height="20"/>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['count','title']
}
</script>