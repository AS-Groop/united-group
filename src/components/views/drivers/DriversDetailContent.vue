<template>
  <DriversTabMenu
      :index="index"
      @clicks="e=>index=e"
  />
  <TransitionGroup mode="none" name="slide">
    <DriversTabItems @click="()=>modal=true" :items="items0" v-if="index === 0" />
    <DriversTabItems @click="()=>modal=true" :items="items1" v-else-if="index === 1" />
    <DriversTabItems @click="()=>modal=true" :items="items2" v-else-if="index === 2" />
    <DriversTabItems @click="()=>modal=true" :items="items3" v-else-if="index === 3" />
  </TransitionGroup>
  <ModalDrivers v-if="modal" @close="modal = false"/>
</template>
<script>
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import DriversTabItems from "@/components/views/drivers/DriversTabItem";
import TableTool from "@/components/app/table/TableTool";

import {ref} from "vue";
import ModalDrivers from "@/components/app/modals/ModalDrivers";
export default {
  components: {ModalDrivers, DriversTabItems, DriversTabMenu,TableTool},
  setup(){
    const index = ref(0)
    const modal = ref(false)
    const tabContents = ['DriversTabItems', 'TableTool', 'DriversTabIt', 'DriversTabI'];

    const items0=[
      {name:'Recruited By'},
      {name:'Approved MVR'},
      {name:'Company Name'},
      {name:'Accepted Clearing House Consent'},
      {name:'PSP'},
      {name:'Driver Scheduled For Drug Test'},
      {name:'Experience'},
      {name:'Truck Number'},
      {name:'Driver Type'},
      {name:'Pay:'},
    ]
    const items1=[
      {name:'Accepted Clearing House Consent'},
      {name:'PSP'},
      {name:'Driver Scheduled For Drug Test'},
      {name:'Experience'},
      {name:'Truck Number'},
      {name:'Driver Type'},
      {name:'Pay:'},
    ]
    const items2=[
      {name:'Driver Scheduled For Drug Test'},
      {name:'Experience'},
      {name:'Truck Number'},
      {name:'Driver Type'},
      {name:'Pay:'},
    ]
    const items3=[
      {name:'Company Name'},
      {name:'Truck Number'},
      {name:'Driver Type'},
      {name:'Pay:'},
    ]
    return{tabContents,index,items1,items0,items2,items3,modal}
  }
}
</script>

<style lang="scss">
$transition: all 0.3s linear;
.slide-enter-active,
.slide-leave-active{
  transition: $transition;
}

.slide-enter-from,
.slide-leave-to {
  position: absolute;
  width: 100%;
  transform: translateX(20px);
  opacity: 0;
}
</style>