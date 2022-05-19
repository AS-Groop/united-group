<template>
  <div>
    <div class="trucks__title text-h3-SBold">Pick Up</div>
    <div class="trucks__pick-up">
      <div class="trucks__pick-location">
        <v-input  label="Location" place="Enter Location"/>
        <div class="trucks__pick-radios">
          <v-radio-input label="Empty" name="location" value=""/>
          <v-radio-input label="Loaded" name="location" value=""/>
        </div>
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload an image of the odometer and fuel level to help verify the mileage and fuel used during your trip!</p>
        <p class="info">
          <v-svg id="icon-info-gray" width="21" height="21" />
          <span>Only for reefer trailers</span>
        </p>
        <TruckPickLoad svg="icon_full-level" :img="img" />
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload a minimum of 5 images of the following!</p>
        <TruckPickLoad svg="icon-track-side" :img="img" />
        <TruckPickLoad svg="icon-truck-front" :img="img" />
        <TruckPickLoad svg="icon-truck-side2" :img="img" />
        <TruckPickLoad svg="icon-truck-back" :img="img" />
        <TruckPickLoad svg="icon-truck-tires" :img="img" />
        <TruckPickLoad svg="icon-truck-damages" :img="img" />
      </div>
      <div class="trucks__pick-selects">
        <TruckPickSelect title="Check items needing repair" count="7"/>
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
  components: {VRadioInput, RadioSelect, TruckPickSelect, TruckPickLoad, VSvg, VInput},
  data(){
    return{
      img:false
    }
  }
}
</script>