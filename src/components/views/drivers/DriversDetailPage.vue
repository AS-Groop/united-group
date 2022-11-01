<template>
  <v-loading v-if="load"/>
  <div v-else class="section__page drivers">
    <DetailNav>
      <DeatilNavBack v-if="driver_by_id" :title="driver_by_id.first_name + ' ' +driver_by_id.last_name" path="/drivers"/>
      <span class="detail__nav-item text-h6">
        <v-svg id="phone" width="18" height="18" />{{ driver_by_id ? driver_by_id.phone : '' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="massage" width="18" height="18" />{{ driver_by_id ? driver_by_id.email : '' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="truck" width="18" height="18" />{{ driver_by_id?.assigned_truck?.number || '#' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="trailer" width="18" height="18" />{{ driver_by_id?.assigned_trailer?.number || '#' }}
      </span>
    </DetailNav>
    <DriversTabMenu
        v-if="tabs_content"
        :index="tab"
        :tabs_content="tabs_content"
        @clicks="e=>tab=e"
    />
    <template v-if="tab && !!steps_list && tab!=='road_test'">
      <DriversTabItems @openModal="(val)=>modal_data=val"
                       @updateList="fetchList"
                       :items="steps_list[tab]"
                       :tab="tab"
                      />
      <div v-if="tabs_content.find(i=>i.alias===tab)?.finished_at" class="drivers__detail-item justify-end">
        {{changeTimezone((tabs_content.find(i=>i.alias===tab)?.finished_at)+' GMT+0:00')}}
      </div>
    </template>
    <template v-if="tab==='road_test'">
      <DriverRoadTest/>
    </template>
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
import {computed, onMounted, ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import {driver_by_id, getDriverById, tabs_content} from "@/hooks/driver/useDriver";
import {my_steps, steps} from "@/hooks/driver/useStep";
import router from "@/router";
import VLoading from "@/components/ui/vLoading";
import DriverRoadTest from "@/components/views/drivers/DriverRoadTest";
export default {
  components: {
    VLoading,
    VSvg, DriverRoadTest,
    DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const tab = ref('road_test');
    const load = ref(false);
    const modal_data = ref(null);
    const modal = ref(false);
    const steps_list =computed(()=>my_steps.value)
    // !!steps.value || steps.value.length > 0 ? console.log(Object.entries(steps.value)[0][0]) :''
    // steps ? tab.value = Object.entries(steps.value) : ''

    async function fetchList(){
      load.value = true;
      await getDriverById(router.currentRoute.value.params.id)
      load.value = false;
    }

    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const changeTimezone =(date)=> new Date(date).toLocaleString('en-US',{timeZone:'America/Chicago'})
    onMounted(() => {
      fetchList();
    });
    return {tabs_content, tab, modal, modal_data, driver_by_id, steps_list, load, fetchList, changeTimezone};
  }
}
</script>