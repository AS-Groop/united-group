<template>
  <div class="detail__nav-back">
    <v-svg @click="$router.push(path)" id="icon-arrowLeft" width="24" height="24" />
    <span class="text-h3"> <span>{{span}}</span> {{title}}</span>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";
export default {
  components: {VSvg},
  props:['title','path', 'span']
}
</script>