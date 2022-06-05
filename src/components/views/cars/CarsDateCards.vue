<template>
  <div class="content-title text-h3-SBold">Pick Up & Drop Off</div>
  <div class="cars__content-dates py-15 mx--15">
    <div class="date__item px-15">
      <div class="date__cart">
        <div class="date__cart-title mb-15 text-h2">Pick Up</div>
        <div class="mx--15 d-flex">
          <div class="px-15 date__cart-time">
            <datepicker v-model="picked" />
            <v-svg class-name="svg-date" id="calendar" width="24" height="24"/>
          </div>
          <div class="px-15 date__cart-time">
            <datepicker v-model="picked" />
            <v-svg class-name="svg-date" id="time" width="24" height="24"/>
          </div>
        </div>
      </div>
    </div>
    <div class="date__item px-15">
      <div class="date__cart">
        <div class="date__cart-title mb-15 px-15 text-h2">Pick Up</div>
        <div class="mx--15 d-flex">
          <div class="px-15 date__cart-time">
            <datepicker v-model="picked"  />
            <v-svg class-name="svg-date" id="calendar" width="24" height="24"/>
          </div>
          <div class="px-15 date__cart-time">
            <datepicker v-model="picked" />
            <v-svg class-name="svg-date" id="time" width="24" height="24"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Datepicker from 'vue3-datepicker'
import VSvg from "@/components/ui/vSvg";
import {ref} from "vue";

export default {
  components:{Datepicker,VSvg},
  setup() {
    const picked = ref(new Date());

    return{picked}
  }
};
</script>