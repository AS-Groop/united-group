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
    <DriversDetailContent/>
  </div>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRowDrivers from "@/components/app/table/TableHRowDrivers";
import TableBRowDrivers from "@/components/app/table/TableBRowDrivers";
import DetailNav from "@/components/app/deatailNav/DetailNav";
import VSvg from "@/components/ui/vSvg";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import DriversDetailContent from "@/components/views/drivers/DriversDetailContent";

export default {
  components: {
    DriversDetailContent,
    DeatilNavBack, VSvg, DetailNav, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
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
  }
}
</script>