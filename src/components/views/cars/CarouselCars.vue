<template>
  <div class="cars__carousel">
    <swiper
        :slidesPerView="'auto'"
        :centeredSlides="false"
        :slidesPerGroup="1"
        :spaceBetween="15"
    >
      <swiper-slide>
        <div class="cars__carousel-item">
          <div class="title text-h3">Nissan Rogue</div>
          <div class="text">AV82062</div>
          <span class="text-h4 booked">Booked</span>
          <img src="@/assets/images/car1.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cars__carousel-item">
          <div class="title text-h3">Chevralet Malibu</div>
          <div class="text">AV82062</div>
          <span class="text-h4 available">Available</span>
          <img src="@/assets/images/car1.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cars__carousel-item">
          <div class="title text-h3">Chevralet Malibu</div>
          <div class="text">AV82062</div>
          <span class="text-h4 booked">Booked</span>
          <img src="@/assets/images/car1.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="cars__carousel-item">
          <div class="title text-h3">Nissan Rogue</div>
          <div class="text">AV82062</div>
          <span class="text-h4 available">Available</span>
          <img src="@/assets/images/car1.png" alt="">
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>

// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
}
</script>