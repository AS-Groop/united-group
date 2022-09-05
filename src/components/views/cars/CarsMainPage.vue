<template>
  <div class="section__page">
    <div class="cars__main-page">
      <CarouselCars @selectCar="selectCar" :select="car_id"/>
      <div class="cars__content-page">
        <CarsDriverInfo :disabled="car_id" v-model:content_car="content_car" :validate="v$"/>
        <CarsDateCards :disabled="car_id" v-model:content_car="content_car" :validate="v$"/>
        <div class="d-flex align-center justify-end my-15">
          <v-btn type="140" @click="save"> {{ content_car?.type === 'pickup' ? 'Drop Off' : 'Pick Up' }}</v-btn>
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
import {onMounted, ref} from "vue";
import {car_id, car_pick_drop, getAllCarList, getPickDropCar, pickDropCar} from "@/hooks/car/useCar";
import {getFormListEntities} from "@/hooks/form/useForm";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
export default {
  name:"CarsMainPage",
  components: {CarsHistory, CarsDateCards, CarsDriverInfo,  VBtn, CarouselCars},
  setup(){
    let car_id = ref(null)
    let content_car = ref({})
    const rules = {
      company: { id:{required} },
      drop_off_date: { required },
      full_name: { required },
      key_given_by: { required },
      location: { required },
      odometer: { required },
      phone_number: { required },
    }
    const v$ = useVuelidate(rules, content_car);
    onMounted(async ()=>{
      await getAllCarList();
      await getFormListEntities({entities: 'company', limit: 99});
    })

    async function save(){
      v$.value.$touch();
      let obj = {
        company_id: content_car.value?.company?.id || "",
        drop_off_date: content_car.value?.drop_off_date || "",
        full_name: content_car.value?.full_name || "",
        key_given_by: content_car.value?.key_given_by || "",
        location: content_car.value?.location || "",
        odometer: content_car.value?.odometer || "",
        phone_number: content_car.value?.phone_number || "",
        pickup_date: content_car.value?.pickup_date || "",
        type: content_car.value?.type==='dropoff'?'pickup':'dropoff'
      }
      if (!v$.value.$invalid) {
        await pickDropCar({id:car_id.value ,obj});
        await getAllCarList();
        await selectCar(car_id.value);
        v$.$reset();
      }
    }

    async function selectCar(id){
      content_car.value = {};
      await getPickDropCar({id});
      if(car_pick_drop.value)content_car.value = car_pick_drop.value;
      car_id.value = id;
    }

    return{selectCar, v$, car_id, content_car, save}
  }
}
</script>