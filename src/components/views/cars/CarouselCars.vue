<template>
  <div class="cars__carousel">
    <swiper
        :slidesPerView="'auto'"
        :centeredSlides="false"
        :slidesPerGroup="1"
        :spaceBetween="15"
    >
      <template v-if="all_cars_list && all_cars_list.cars.length">
      <swiper-slide v-for="car in all_cars_list.cars">
        <div class="cars__carousel-item" :class="{'select':select === car.id}" @click="$emit('selectCar',car.id)">
          <div class="title">{{ car.model }} {{ car.make }}</div>
          <div class="title_info" v-if="car?.year && car?.color">{{ car.year }} ({{ car.color }})</div>
          <div class="text">{{ car.plate_number }}</div>
          <span class="text-h4" :style="'background:'+car.status.color">{{ car.status.name }}</span>
          <CarImageItem v-if="car.image_id" :img="car.image_id"/>
        </div>
      </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script>

// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import {all_cars_list} from "@/hooks/car/useCar";
import CarImageItem from "@/components/views/cars/CarImageItem";
import {ref} from "vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CarImageItem
  },
  props:['select'],
  setup(){
    const carImg = ref(null)
    return {all_cars_list, carImg}
  }
}
</script>