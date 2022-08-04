<template>
  <div>
    <div class="trucks__title text-h3-SBold">Pick Up</div>
    <div class="trucks__pick-up">
      <div class="trucks__pick-location">
        <v-input v-model="data_target.location" label="Location" place="Enter Location"/>
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload an image of the odometer and fuel level to help verify the mileage and fuel used during your trip!</p>
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Odometer image'})" title="Odometer image" svg="odometer" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Fuel level image'})" title="Fuel level image" svg="full-level" :img="img" />
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload a minimum of 5 images of the following!</p>
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Drive side of the vehicle'})" title="Drive side of the vehicle" svg="track-side" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Front of the vehicle'})" title="Front of the vehicle" svg="truck-front" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Passenger side'})" title="Passenger side" svg="truck-side2" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Back of the vehicle'})" title="Back of the vehicle" svg="truck-back" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Tires'})" title="Tires" svg="truck-tires" :img="img" />
        <TruckPickLoad @click="$emit('loadPhoto',{name:'Any damages'})" title="Any damages" svg="truck-damages" :img="img" />
      </div>
      <div class="trucks__pick-selects">
        <TruckPickSelect @click="$emit('modal1')" title="In cab devices" count="4"/>
        <TruckPickSelect @click="$emit('modal2')" title="Externally displayed signs & decals" count="8"/>
      </div>
    </div>
  </div>

</template>
<script>
import VInput from "@/components/ui/vInput";
import VSvg from "@/components/ui/vSvg";
import TruckPickLoad from "@/components/views/trucks/detail/TruckPickLoad";
import TruckPickSelect from "@/components/views/trucks/detail/TruckPickSelect";
export default {
  props:['data_target'],
  components: {TruckPickSelect, TruckPickLoad, VSvg, VInput},
  data(){
    return{
      img:'https://priem.stankin.ru/upload/landing/09c/c86jma8jukreqbujathoanebut3eq8xd/banner_610x610_poday-dokymenti@1x.jpg'
    }
  }
}
</script>