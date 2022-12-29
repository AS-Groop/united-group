<template>
  <v-loading v-if="load"/>
  <div v-else class="section__page drivers">
    <DetailNav>
      <DeatilNavBack v-if="driver_by_id" :title="driver_by_id.first_name + ' ' +driver_by_id.last_name" path="/drivers"/>
      <span class="detail__nav-item text-h6">
        <v-svg id="phone" width="18" height="18" />{{ driver_by_id ? driver_by_id.phone : '' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="truck" width="18" height="18" />{{ driver_by_id?.assigned_truck?.number || '#' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="trailer" width="18" height="18" />{{ driver_by_id?.assigned_trailer?.number || '#' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-svg id="money" width="18" height="18" />{{ driver_by_id?.pay_rate || '---' }}
      </span>
      <span class="detail__nav-item text-h6">
        <v-toggle-driver :id="'check'+driver_by_id?.id" @check="check" :check="driver_by_id?.status?.alias === 'active' || driver_by_id?.status?.alias === 'new'"/>
      </span>
<!--      <span class="detail__nav-item text-h6">-->
<!--&lt;!&ndash;        <v-svg id="massage" width="18" height="18" />{{ driver_by_id ? driver_by_id.email : '' }}&ndash;&gt;-->
<!--         <v-toggle :id="'saf'" @check="check" :check="driver_by_id?.status?.alias === 'active'"/>-->
<!--      </span>-->
      <span class="detail__nav-item text-h6">
        <v-btn type="edit" size="md" @click="modal_edit = true">Edit</v-btn>
      </span>
      <span class="detail__nav-item text-h6">
        <v-btn type="edit delete" size="md" @click="delete_modal = true">Delete</v-btn>
      </span>
    </DetailNav>
    <DriversTabMenu
        v-if="tabs_content"
        :index="tab"
        :tabs_content="tabs_content"
        @fetch="inspectionDepart()"
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
  <ModalDelete @delete="deleteDriver" @close="delete_modal = false" v-if="delete_modal"/>
  <ModalAdded :title="'Edit driver'" v-if="modal_edit" @close="modal_edit = false" @save="editDriver">
    <template v-slot:img>
      <!--      <input type="file" accept="image/*">-->
      <img src="@/assets/images/avatar.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="driver.first_name" :error="v$.$dirty && v$.first_name.$invalid" label="Name" place="Enter name"/>
      <v-input v-model="driver.last_name" :error="v$.$dirty && v$.last_name.$invalid" label="Last name" place="Enter last name"/>
<!--      <v-input v-model="driver.pay_rate"  label="Last name" place="Enter pay rate"/>-->
      <v-input v-model="driver.email" :error="v$.$dirty && v$.email.$invalid" label="Email" place="Enter email address"/>
      <v-input v-model="driver.phone" :error="v$.$dirty && v$.phone.$invalid" label="Phone" place="Enter phone number"/>
    </template>
  </ModalAdded>

</template>

<script>
import DetailNav from "@/components/app/deatailNav/DetailNav";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import ModalDrivers from "@/components/app/modals/ModalDrivers";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import DriversTabItems from "@/components/views/drivers/DriversTabItem";
import TableTool from "@/components/app/table/TableTool";
import {computed, onMounted, ref, watch} from "vue";
import VSvg from "@/components/ui/vSvg";
import {
  deleteDriverById,
  driver_by_id,
  driver_statuses,
  getDriverById,
  getDriverStatuses,
  tabs_content, tabsContentPer, updateDriverById,
  updateStatusDriver
} from "@/hooks/driver/useDriver";
import {my_steps, steps} from "@/hooks/driver/useStep";
import router from "@/router";
import VLoading from "@/components/ui/vLoading";
import DriverRoadTest from "@/components/views/drivers/DriverRoadTest";
import ModalDelete from "@/components/app/modals/ModalDelete";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import VToggleDriver from "@/components/ui/vToggleDriver";
export default {
  components: {
    VToggleDriver,
    ModalDelete,
    VLoading,ModalAdded,
    VSvg, DriverRoadTest,
    DriversTabMenu,ModalDrivers,VInput,
    DeatilNavBack,DriversTabItems, TableTool, DetailNav},
  setup(){
    const tab = ref('road_test');
    const load = ref(false);
    const delete_modal = ref(false);
    const modal_edit = ref(false);
    const modal_data = ref(null);
    const modal = ref(false);
    const driver = ref({
      email: "",
      first_name: "",
      image_id: "",
      last_name: "",
      phone: ""
    });
    const steps_list =computed(()=>my_steps.value)
    // !!steps.value || steps.value.length > 0 ? console.log(Object.entries(steps.value)[0][0]) :''
    // steps ? tab.value = Object.entries(steps.value) : ''

    async function fetchList(){
      await getDriverById(router.currentRoute.value.params.id)
    }

    async function check(val) {
      let id = '';
      if(val) {
        tabsContentPer().value === 1 ? id = driver_statuses?.value?.find(e => e.alias === 'active')?.id
            : id = driver_statuses?.value?.find(e => e.alias === 'new')?.id;
      } else {
        id = driver_statuses?.value?.find(e => e.alias === 'inactive')?.id;
      }
      await updateStatusDriver({driver_id: driver_by_id.value.id, status_id:id})
    }

    async function inspectionDepart(){
      let id = '';
      if(driver_by_id.value?.status?.alias !== 'inactive'){
        if (tabsContentPer().value === 1 && driver_by_id.value?.status?.alias === 'active') return;
        if (tabsContentPer().value < 1 && driver_by_id.value?.status?.alias === 'new') return;
        console.log('inspectionDepart')

        tabsContentPer().value === 1
            ? id = driver_statuses?.value?.find(e => e.alias === 'active')?.id
            : id = driver_statuses?.value?.find(e => e.alias === 'new')?.id;

        await updateStatusDriver({driver_id: driver_by_id.value.id, status_id:id})
      }
    }

    async function deleteDriver(){
      await deleteDriverById(driver_by_id.value.id);
      router.back();
    }

    async function editDriver(){

      v$.value.$touch();
      if(!v$.value.$invalid){
        await updateDriverById({id:driver_by_id.value.id,data:driver.value})
        await fetchList();
        modal_edit.value = false;
      }
    }



    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const changeTimezone =(date)=> new Date(date).toLocaleString('en-US',{timeZone:'America/Chicago'})
     onMounted(async() => {
      load.value = true;
      await fetchList();
      await getDriverStatuses();
      await inspectionDepart();
      driver.value={
        email: driver_by_id.value.email,
        first_name: driver_by_id.value.first_name,
        image_id: "",
        last_name: driver_by_id.value.last_name,
        phone: driver_by_id.value.phone
      }
       console.log('xxxxxxxxxxxx',tabsContentPer().value)
       console.log('tabs_content.value',driver_by_id.value)
      load.value = false;
    });

    const rules = {
      first_name: { required },
      last_name: { required },
      email: { email },
      phone: { required }
    }
    const v$ = useVuelidate(rules, driver);

    return {tabs_content, v$, check, tab, modal, delete_modal, deleteDriver, editDriver,inspectionDepart,
      modal_data, driver_by_id, driver, steps_list, load, fetchList, changeTimezone, modal_edit};
  }
}
</script>