<template>
  <div class="section__page">
    <div class="cars__main-page">
      <CarouselCars/>
      <div class="cars__content-page">
        <CarsDriverInfo/>
        <CarsDateCards/>
        <div class="d-flex align-center justify-end my-15">
          <v-btn type="140">Pick Up</v-btn>
        </div>
        <CarsHistory/>
      </div>
    </div>
  </div>

</template>

<script>
import CarouselCars from "@/components/views/cars/CarouselCars";
import VBtn from "@/components/ui/vBtn";
import CarsDriverInfo from "@/components/views/cars/CarsDriverInfo";
import CarsDateCards from "@/components/views/cars/CarsDateCards";
import CarsHistory from "@/components/views/cars/CarsHistory";
import { onMounted } from "vue";
import { getAllCarList } from "@/hooks/car/useCar";
import { getAllUserList } from "@/hooks/user/useUser";
import { getAllDepartmentList } from "@/hooks/department/useDepartment";
export default {
  components: {CarsHistory, CarsDateCards, CarsDriverInfo,  VBtn, CarouselCars},
  setup(){


    onMounted(()=>{
      getAllCarList();
      getAllUserList();
      getAllDepartmentList();
    })
  }
}
</script>