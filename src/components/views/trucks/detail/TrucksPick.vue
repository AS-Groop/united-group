<template>
  <div>
    <div class="trucks__title text-h3-SBold">Pick Up</div>
    <div class="trucks__pick-up">
      <div class="trucks__pick-location">
        <v-input :error="!validate && !data_target.location" v-model="data_target.location" label="Location" place="Enter Location"/>
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload an image of the odometer and fuel level to help verify the mileage and fuel used during your trip!</p>
        <TruckPickLoad :error="!validate && !data_target.odometer_images" @click="$emit('loadPhoto',{name:'odometer_images',title:'Odometer image'})" :count="data_target.odometer_images?.length" title="Odometer image" svg="odometer" :img="data_target.odometer_images && data_target.odometer_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.fuel_level_images" @click="$emit('loadPhoto',{name:'fuel_level_images',title:'Fuel level image'})" :count="data_target.fuel_level_images?.length" title="Fuel level image" svg="full-level" :img="data_target.fuel_level_images && data_target.fuel_level_images[0]" />
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload a minimum of 5 images of the following!</p>
        <TruckPickLoad :error="!validate && !data_target.driver_side_images" @click="$emit('loadPhoto',{name:'driver_side_images',title:'Drive side of the vehicle'})" :count="data_target.driver_side_images?.length" title="Drive side of the vehicle" svg="track-side" :img="data_target.driver_side_images && data_target.driver_side_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.front_side_images" @click="$emit('loadPhoto',{name:'front_side_images',title:'Front of the vehicle'})" :count="data_target.front_side_images?.length" title="Front of the vehicle" svg="truck-front" :img="data_target.front_side_images && data_target.front_side_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.passenger_side_images" @click="$emit('loadPhoto',{name:'passenger_side_images',title:'Passenger side'})" :count="data_target.passenger_side_images?.length" title="Passenger side" svg="truck-side2" :img="data_target.passenger_side_images && data_target.passenger_side_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.back_side_images" @click="$emit('loadPhoto',{name:'back_side_images',title:'Back of the vehicle'})" :count="data_target.back_side_images?.length" title="Back of the vehicle" svg="truck-back" :img="data_target.back_side_images && data_target.back_side_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.tire_images" @click="$emit('loadPhoto',{name:'tire_images',title:'Tires'})" :count="data_target.tire_images?.length" title="Tires" svg="truck-tires" :img="data_target.tire_images && data_target.tire_images[0]" />
        <TruckPickLoad :error="!validate && !data_target.damage_images" @click="$emit('loadPhoto',{name:'damage_images',title:'Any damages'})" :count="data_target.damage_images?.length" title="Any damages" svg="truck-damages" :img="data_target.damage_images && data_target.damage_images[0]" />
      </div>
      <div class="trucks__pick-selects">
        <TruckPickSelect :error="!validate && !data_target.incab_devices" @click="$emit('modal1')" title="In cab devices" :count="data_target.incab_devices ? data_target.incab_devices.length : 0"/>
        <TruckPickSelect :error="!validate && !data_target.external_displayed " @click="$emit('modal2')" title="Externally displayed signs & decals" :count="data_target.external_displayed ? data_target.external_displayed.length : 0"/>
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
  props:['data_target','validate'],
  components: {TruckPickSelect, TruckPickLoad, VSvg, VInput},
  data(){
    return{
      img:'https://priem.stankin.ru/upload/landing/09c/c86jma8jukreqbujathoanebut3eq8xd/banner_610x610_poday-dokymenti@1x.jpg'
    }
  }
}
</script>