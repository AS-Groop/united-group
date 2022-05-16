<template>
  <div>

    <div class="trucks__title text-h3-SBold">Pick Up</div>
    <div class="trucks__pick-up">
      <div class="trucks__pick-location">
        <v-input  label="Location" place="Enter Location"/>
      </div>
      <div class="trucks__pick-loads">
        <p class="text-h4">Please upload an image of the odometer and fuel level to help verify the mileage and fuel used during your trip!</p>
        <TruckPickLoad svg="icon_odometer" :img="img" />
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
        <TruckPickSelect title="In cab devices" count="4"/>
        <TruckPickSelect title="Externally displayed signs & decals" count="8"/>
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
  components: {TruckPickSelect, TruckPickLoad, VSvg, VInput},
  data(){
    return{
      img:false
    }
  }
}
</script>