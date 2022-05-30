<template>
  <div class="section__page drivers">
    <DetailNav>
      <DeatilNavBack title="Ahmad Zakirov" path="/drivers"/>
      <span class="detail__nav-item text-h6">
        <v-svg id="phone" width="18" height="18" />+1 773 217 77 77
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="massage" width="18" height="18" />akhmad7721@gmail.com
      </span>
    </DetailNav>
    <DriversTabMenu
        :index="index"
        :tabs_content="tabs_content"
        @clicks="e=>index=e"
    />
    <TransitionGroup mode="none" name="slide">
      <DriversTabItems @update="(val)=>modal_data=val" :items="items0" v-if="index === 0" />
      <DriversTabItems @update="(val)=>modal_data=val" :items="items1" v-else-if="index === 1" />
      <DriversTabItems @update="(val)=>modal_data=val" :items="items2" v-else-if="index === 2" />
      <DriversTabItems @update="(val)=>modal_data=val" :items="items3" v-else-if="index === 3" />
    </TransitionGroup>
  </div>
  <ModalDrivers v-if="modal_data" :modal_data="modal_data" title="Recruited By" @close="modal_data = null"/>
</template>

<script>
import DetailNav from "@/components/app/deatailNav/DetailNav";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import ModalDrivers from "@/components/app/modals/ModalDrivers";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import DriversTabItems from "@/components/views/drivers/DriversTabItem";
import TableTool from "@/components/app/table/TableTool";
import {ref} from "vue";
import VSvg from "@/components/ui/vSvg";
export default {
  components: {
    VSvg,
    DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const index = ref(0)
    const modal_data = ref(null)
    const modal = ref(false)
    const tabs_content = ['HR (15%)', 'Sefety(35%)', 'Dispach Orentation (65%)', 'Fleet (92%)'];

    const items0=[
      {select_name:'Select Recruiter',id: 'Recruited',name:'Recruited By'},
      {select_name:'',id: 'Approved',name:'Approved MVR'},
      {select_name:'Select Company',id: 'Company',name:'Company Name'},
      {select_name:'',id: 'Accepted',name:'Accepted Clearing House Consent'},
      {select_name:'',id: 'PSP',name:'PSP'},
      {select_name:'',id: 'Driver',name:'Driver Scheduled For Drug Test'},
      {select_name:'Experience',id: 'Experience',name:'Experience'},
      {select_name:'',id: 'Truck',name:'Truck Number'},
      {select_name:'',id: 'Driver',name:'Driver Type'},
      {select_name:'',id: 'Pay',name:'Pay:'},
    ]
    const items1=[
      {select_name:'',id: 'Accepted',name:'Accepted Clearing House Consent'},
      {select_name:'',id: 'PSP',name:'PSP'},
      {select_name:'',id: 'Driver',name:'Driver Scheduled For Drug Test'},
      {select_name:'',id: 'Experience',name:'Experience'},
      {select_name:'',id: 'Truck',name:'Truck Number'},
      {select_name:'',id: 'Driver',name:'Driver Type'},
      {select_name:'',id: 'Pay',name:'Pay:'},
    ]
    const items2=[
      {select_name:'',id: 'Driver',name:'Driver Scheduled For Drug Test'},
      {select_name:'',id: 'Experience',name:'Experience'},
      {select_name:'',id: 'Truck',name:'Truck Number'},
      {select_name:'',id: 'Driver',name:'Driver Type'},
      {select_name:'',id: 'Pay',name:'Pay:'},
    ]
    const items3=[
      {select_name:'',id: 'Company',name:'Company Name'},
      {select_name:'',id: 'Truck',name:'Truck Number'},
      {select_name:'',id: 'Driver',name:'Driver Type'},
      {select_name:'',id: 'Pay',name:'Pay:'},
    ]
    return{tabs_content,index,items1,items0,items2,items3,modal,modal_data}
  }
}
</script>