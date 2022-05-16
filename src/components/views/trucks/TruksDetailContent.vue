<template>
  <div class="section__page trucks">
    <DetailNav>
      <DeatilNavBack title="#120" span="Truck Number:" path="/trucks"/>
    </DetailNav>
    <div class="trucks__content">
      <TrucksInfo/>
      <TrucksPick/>
      <div class="hr"></div>
      <div class="trucks__draw">
        <TrucksDrawItem title="Driver Signature"/>
        <TrucksDrawItem title="Company representative Signature"/>
        <TrucksDrawItem area="true" title="Comments"/>
      </div>
      <div class="btns"></div>
    </div>
  </div>
</template>

<script>
import DetailNav from "@/components/app/deatailNav/DetailNav";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import DriversTabItems from "@/components/views/drivers/DriversTabItem";
import {ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import TrucksInfo from "@/components/views/trucks/detail/TrucksInfo";
import VInput from "@/components/ui/vInput";
import TrucksPick from "@/components/views/trucks/detail/TrucksPick";
import TrucksDrawItem from "@/components/views/trucks/detail/TrucksDrawItem";
export default {
  components: {
    TrucksDrawItem,
    TrucksPick,
    VInput,
    TrucksInfo,
    VSvg,
    DeatilNavBack,  DetailNav},
  setup(){
    const index = ref(0)
    const modal_data = ref(null)
    const modal = ref(false)
    const tabContents = ['DriversTabItems', 'TableTool', 'DriversTabIt', 'DriversTabI'];

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
    return{tabContents,index,items1,items0,items2,items3,modal,modal_data}
  }
}
</script>