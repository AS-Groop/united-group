<template>
  <div>


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