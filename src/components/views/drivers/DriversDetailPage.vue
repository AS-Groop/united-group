<template>
  <div class="section__page drivers">
    <DetailNav>
      <DeatilNavBack v-if="driver_by_id" :title="driver_by_id.first_name + ' ' +driver_by_id.last_name" path="/drivers"/>
      <span class="detail__nav-item text-h6">
        <v-svg id="phone" width="18" height="18" />{{ driver_by_id ? driver_by_id.phone : '' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="massage" width="18" height="18" />{{ driver_by_id ? driver_by_id.email : '' }}
      </span>
    </DetailNav>
    <DriversTabMenu
        v-if="tabs_content"
        :index="tab"
        :tabs_content="tabs_content"
        @clicks="e=>tab=e"
    />
    <DriversTabItems @update="(val)=>modal_data=val"
                       :items="tab === 'dipatch_orientation' ? items0 : tab === 'hr' ? items1 : tab === 'safety' ? items2 : tab === 'fleet' ? items3 : ''"
                       v-if="tab" />
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
import {computed, ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import {driver_by_id, tabs_content} from "@/hooks/driver/useDriver";
import {departments} from "@/hooks/driver/useDepartment";
export default {
  components: {
    VSvg,
    DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const tab = ref('hr')
    const modal_data = ref(null)
    const modal = ref(false)

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
    return{tabs_content,tab,items1,items0,items2,items3,modal,modal_data, driver_by_id, departments}
  }
}
</script>