<template>
  <div class="dashboard__item">
    <div class="dashboard__item-inner">
      <div class="dashboard__item-left">
        <div class="d-flex align-end justify-between">
          <div>
            <div class="title text-gray2 text-h2">{{ title }}</div>
            <div class="count" :class="type">{{ count }}</div>
          </div>
          <v-svg :id="chart ? chart : 'chart1'" width="110" height="70"/>
        </div>
        <div class="info align-center d-flex" :class="type">
          <v-svg id="up1" width="27" height="27"/>
          <p class="text-h3 text-gray2"><span :class="type">{{ info }}</span> from last month</p>
        </div>
      </div>
      <div class="dashboard__item-right">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import VSvg from "@/components/ui/vSvg";

export default {
  components: {VSvg},
  props: {
    title: '',
    count: '',
    info: '',
    type: '',
    chart: '',
  }
}
</script>