<template>
  <div class="section__page drivers">
    <DetailNav>
      <DeatilNavBack/>
      <span class="detail__nav-item text-h6">
        <v-svg id="icon-phone" width="18" height="18" />+1 773 217 77 77
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="icon-massage" width="18" height="18" />akhmad7721@gmail.com
      </span>
    </DetailNav>
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
  </div>
  <ModalDrivers v-if="modal" @close="modal = false"/>
</template>

<script>
import DetailNav from "@/components/app/deatailNav/DetailNav";
import VSvg from "@/components/ui/vSvg";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import DriversDetailContent from "@/components/views/drivers/DriversDetailContent";
import ModalDrivers from "@/components/app/modals/ModalDrivers";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import DriversTabItems from "@/components/views/drivers/DriversTabItem";
import TableTool from "@/components/app/table/TableTool";
import {ref} from "vue";
export default {
  components: {
    DriversDetailContent,DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, VSvg,TableTool, DetailNav},
  data(){
    return {
      data_head:[
        'Driver Name',
        'Date On Board',
        'Human Resources',
        'Safety',
        'Dispatch Orientation',
        'Fleet',
        'Assigned Truck',
        'Assigned Trailer',
        'Status',
      ],
      data_body:[{
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }, {
        col1: 'Ahmad Zakirov',
        col2: '12.02.2022',
        col3: '100%',
        col4: '35%',
        col5: '0%',
        col6: '0%',
        col7: '-',
        col8: '-',
        col9: 'Active',
      }
        ,{
          col1: 'Ahmad Zakirov',
          col2: '12.02.2022',
          col3: '100%',
          col4: '35%',
          col5: '0%',
          col6: '0%',
          col7: '-',
          col8: '-',
          col9: 'Active',}]
    }
  },
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