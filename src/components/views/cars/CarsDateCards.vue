<template>
  <div class="content-title text-h3-SBold">Pick Up & Drop Off</div>
  <div class="cars__content-dates py-15 mx--15">
    <div class="date__item px-15">
      <div class="date__cart">
        <div class="date__cart-title mb-15 text-h2">Pick Up</div>
        <div class="mx--15 d-flex">
          <div class="px-15 date__cart-time">
<!--            <Datepicker v-model="pick_up_date" textInput />-->
            <input type="date" :disabled="!!!disabled" @change="updateDate()" :class="{'error':validate?.$dirty && !pick_up_date}" v-model="pick_up_date">
<!--            <v-svg class-name="svg-date" id="calendar" width="24" height="24"/>-->
          </div>
          <div class="px-15 date__cart-time">
<!--            <Datepicker v-model="picked" />-->
            <input type="time" :disabled="!!!disabled" @change="updateDate()" :class="{'error':validate?.$dirty && !pick_up_time}" v-model="pick_up_time">
<!--            <v-svg class-name="svg-date" id="time" width="24" height="24"/>-->
          </div>
        </div>
      </div>
    </div>
    <div class="date__item px-15">
      <div class="date__cart">
        <div class="date__cart-title mb-15 px-15 text-h2">Drop Off</div>
        <div class="mx--15 d-flex">
          <div class="px-15 date__cart-time">
<!--            <Datepicker v-model="picked" />-->
            <input type="date" :disabled="!!!disabled" @change="updateDate()" :class="{'error':validate?.$dirty && !drop_off_date}" v-model="drop_off_date"/>
<!--            <v-svg class-name="svg-date" id="calendar" width="24" height="24"/>-->
          </div>
          <div class="px-15 date__cart-time">
<!--            <Datepicker v-model="picked" />-->
            <input type="time" :disabled="!!!disabled" @change="updateDate()" :class="{'error':validate?.$dirty && !drop_off_time}" v-model="drop_off_time">
<!--            <v-svg class-name="svg-date" id="time" width="24" height="24"/>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import Datepicker from 'vue3-datepicker'
import VSvg from "@/components/ui/vSvg";
import {ref, watch} from "vue";
import {car_pick_drop} from "@/hooks/car/useCar";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components:{Datepicker,VSvg},
  props:['content_car','validate','disabled'],
  setup(props, ctx) {
    const pick_up_date = ref("");
    const pick_up_time = ref("");
    const drop_off_date = ref("");
    const drop_off_time = ref("");

    watch(props,()=>{
      if(props?.content_car){
        pick_up_date.value = props.content_car?.pickup_date?.split(" ")[0] || "";
        pick_up_time.value = props.content_car?.pickup_date?.split(" ")[1] || "";
        drop_off_date.value = props.content_car?.drop_off_date?.split(" ")[0] || "";
        drop_off_time.value = props.content_car?.drop_off_date?.split(" ")[1] || "";
        console.log(props.content_car?.pickup_date)
      } else{
        pick_up_time.value = pick_up_date.value = drop_off_time.value = drop_off_date.value = ""
      }
    })

    function updateDate(){
      props.content_car.pickup_date = pick_up_date.value + " " + pick_up_time.value;
      props.content_car.drop_off_date = drop_off_date.value + " " + drop_off_time.value;
    }


    return{pick_up_date, pick_up_time, drop_off_date, updateDate, drop_off_time}
  }
};
</script>