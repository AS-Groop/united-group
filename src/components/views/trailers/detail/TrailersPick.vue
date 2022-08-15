<template>
  <div>
    <div class="trucks__title text-h3-SBold">Pick Up</div>
    <div class="trucks__pick-up">
      <div class="trucks__pick-location">
        <v-input :error="!validate && !data_target.location" v-model="data_target.location"  label="Location" place="Enter Location"/>
        <div class="trucks__pick-radios">
          <v-radio-input label="Empty" name="location" value=""/>
          <v-radio-input label="Loaded" name="location" value=""/>
        </div>
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload an image of the odometer and fuel level to help verify the mileage and fuel used during your trip!</p>
        <p class="info">
          <v-svg id="info-gray" width="21" height="21" />
          <span>Only for reefer trailers</span>
        </p>
        <TruckPickLoad :error="!validate && !data_target.fuel_level_images" @click="$emit('loadPhoto',{name:'fuel_level_images',title:'Fuel Level Images'})" :count="data_target.fuel_level_images?.length" :img="data_target.fuel_level_images && data_target.fuel_level_images[0]" svg="full-level" />
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload a minimum of 5 images of the following!</p>
        <TruckPickLoad :error="!validate && !data_target.left_side_images" @click="$emit('loadPhoto',{name:'left_side_images',title:'Left side images'})" :count="data_target.left_side_images?.length" :img="data_target.left_side_images && data_target.left_side_images[0]" svg="trailer-left"/>
        <TruckPickLoad :error="!validate && !data_target.front_side_images" @click="$emit('loadPhoto',{name:'front_side_images',title:'Front side images'})" :count="data_target.front_side_images?.length" :img="data_target.front_side_images && data_target.front_side_images[0]" svg="trailer-front"/>
        <TruckPickLoad :error="!validate && !data_target.right_side_images" @click="$emit('loadPhoto',{name:'right_side_images',title:'Right side images'})" :count="data_target.right_side_images?.length" :img="data_target.right_side_images && data_target.right_side_images[0]" svg="trailer-right"/>
        <TruckPickLoad :error="!validate && !data_target.back_side_images" @click="$emit('loadPhoto',{name:'back_side_images',title:'Back side images'})" :count="data_target.back_side_images?.length" :img="data_target.back_side_images && data_target.back_side_images[0]" svg="trailer-back"/>
        <TruckPickLoad :error="!validate && !data_target.in_side_images" @click="$emit('loadPhoto',{name:'in_side_images',title:'In side images'})" :count="data_target.in_side_images?.length" :img="data_target.in_side_images && data_target.in_side_images[0]" svg="trailer-in"/>
        <TruckPickLoad :error="!validate && !data_target.tire_images" @click="$emit('loadPhoto',{name:'tire_images',title:'Tire images'})" :count="data_target.tire_images?.length" :img="data_target.tire_images && data_target.tire_images[0]" svg="truck-tires"/>
        <TruckPickLoad :error="!validate && !data_target.damage_images" @click="$emit('loadPhoto',{name:'damage_images',title:'Damage images'})" :count="data_target.damage_images?.length" :img="data_target.damage_images && data_target.damage_images[0]" svg="truck-damages"/>
      </div>
      <div class="trucks__pick-selects">
        <TruckPickSelect :error="!validate && !data_target.need_repair_devices" @click="$emit('modal1')" title="Check items needing repair" :count="data_target.need_repair_devices ? data_target.need_repair_devices.length : 0"/>
      </div>
    </div>
  </div>

</template>
<script>
import VInput from "@/components/ui/vInput";
import VSvg from "@/components/ui/vSvg";
import TruckPickLoad from "@/components/views/trucks/detail/TruckPickLoad";
import TruckPickSelect from "@/components/views/trucks/detail/TruckPickSelect";
import RadioSelect from "@/components/views/drivers/modals/RadioSelect";
import VRadioInput from "@/components/ui/vRadioInput";
export default {
  props:['data_target','validate'],
  components: {VRadioInput, RadioSelect, TruckPickSelect, TruckPickLoad, VSvg, VInput},
  data(){
    return{
      img:false
    }
  }
}
</script>