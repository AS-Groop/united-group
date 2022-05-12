<template>
  <DriversTabMenu/>
  <DriversTabItem :name="item" :id="item" v-for="(item,i) in items"/>
</template>
<script>
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import VChecked from "@/components/ui/vChecked";
import DriversTabItem from "@/components/views/drivers/DriversTabItem";
export default {
  components: {DriversTabItem, VChecked, DriversTabMenu},
  data(){
    return{
      items:[
          'Recruited By',
          'Approved MVR',
          'Company Name',
          'Accepted Clearing House Consent',
          'PSP',
          'Driver Scheduled For Drug Test',
          'Experience',
          'Truck Number',
          'Driver Type',
          'Pay:',
      ]
    }
  }
}
</script>