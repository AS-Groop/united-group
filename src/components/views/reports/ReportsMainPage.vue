<template>
  <div class="section__page">
    <FilterBar>
    </FilterBar>
    <DriversTabMenu
        :index="index"
        @clicks="e=>index=e"
        :tabs_content="[{name:'Drivers',alias:0},{name:'Trucks',alias:1},{name:'Trailers',alias:2}]"
        class="bb-0"
    />

    <TableReportsDrivers  v-if="index === 0" />
    <TableReportsTrucks  v-if="index === 1" />
    <TableTrailer v-if="index === 2" />
  </div>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRow from "@/components/app/table/TableHRow";
import TableBRow from "@/components/app/table/TableBRow";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import {onMounted, ref} from "vue";
import TableTrailer from "@/components/views/reports/tables/TableReportsTrailer";
import TableReportsDrivers from "@/components/views/reports/tables/TableReportsDrivers";
import TableReportsTrucks from "@/components/views/reports/tables/TableReportsTrucks";
import {getAllTrucksHistoryList} from "@/hooks/truck/useTruckHistory";
import {getAllTrailersHistoryList} from "@/hooks/trailer/useTrailerHistory";

export default {
  components: {
    TableReportsTrucks,
    TableReportsDrivers,
    TableTrailer,
    DriversTabMenu, VInput, ModalAdded, TableBRow, TableHRow, TableTool, vTable, VBtn, FilterBar},
  data() {
    return {
      new_truck:false,
    }
  },
  setup(){
    const index = ref(0);

    onMounted(()=>{
      getAllTrucksHistoryList();
      getAllTrailersHistoryList();
    })

    return{
      index
    }
  }

}
</script>