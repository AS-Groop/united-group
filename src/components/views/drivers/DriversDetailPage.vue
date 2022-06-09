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
                       :items="tab === 'dipatch_orientation'
                       ? steps['dipatch_orientation'].steps[0].steps
                       : tab === 'hr'
                       ? steps['hr'].steps[0].steps
                       : tab === 'safety'
                       ? steps['safety'].steps[0].steps
                       : tab === 'fleet'
                       ? steps['fleet'].steps[0].steps
                       : ''"
                       v-if="tab && !!steps " />
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
import {steps} from "@/hooks/driver/useStep";
export default {
  components: {
    VSvg,
    DriversTabMenu,ModalDrivers,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const tab = ref('hr')
    const modal_data = ref(null)
    const modal = ref(false)
    return{tabs_content,tab,modal,modal_data, driver_by_id, steps}
  }
}
</script>