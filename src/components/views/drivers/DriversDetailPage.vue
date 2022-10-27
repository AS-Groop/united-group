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
        <v-svg id="truck" width="18" height="18" />{{ driver_by_id?.assigned_truck?.number || '#NoTruck' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="trailer" width="18" height="18" />{{ driver_by_id?.assigned_trailer?.number || '#NoTrailer' }}
      </span>
    </DetailNav>
    <DriversTabMenu
        v-if="tabs_content"
        :index="tab"
        :tabs_content="tabs_content"
        @clicks="e=>tab=e"
    />
    <template v-if="tab && !!steps_list">
      <DriversTabItems @openModal="(val)=>modal_data=val"
                       @updateList="fetchList"
                       :items="tab === 'dipatch_orientation'
                      ? steps_list['dipatch_orientation'].steps
                      : tab === 'hr'
                      ? steps_list['hr'].steps
                      : tab === 'safety'
                      ? steps_list['safety'].steps
                      : tab === 'fleet'
                      ? steps_list['fleet'].steps
                      : ''" />

      <div v-if="tabs_content.find(i=>i.alias===tab)?.finished_at" class="drivers__detail-item justify-end">
        {{tabs_content.find(i=>i.alias===tab)?.finished_at}}
      </div>
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
import {steps} from "@/hooks/driver/useStep";
import router from "@/router";
import VLoading from "@/components/ui/vLoading";
export default {
  components: {
    VLoading,
    VSvg,
    DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const tab = ref(null);
    const load = ref(false);
    const modal_data = ref(null);
    const modal = ref(false);
    const steps_list =computed(()=>steps.value)
    // !!steps.value || steps.value.length > 0 ? console.log(Object.entries(steps.value)[0][0]) :''
    // steps ? tab.value = Object.entries(steps.value) : ''

    async function fetchList(){
      load.value = true;
      await getDriverById(router.currentRoute.value.params.id)
      load.value = false;
    }
    onMounted(() => {
      fetchList()
    });
    return {tabs_content, tab, modal, modal_data, driver_by_id, steps_list, load, fetchList};
  }
}
</script>