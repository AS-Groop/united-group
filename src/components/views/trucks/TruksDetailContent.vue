<template>
  <vLoading v-if="loading" />
  <div v-else class="section__page trucks">
    <DetailNav>
      <DeatilNavBack :title="truck_by_id?.number || '---'" span="Truck Number:" path="/trucks"/>
    </DetailNav>
    <div class="trucks__content">
      <TrucksInfo />
      <template v-if="truck_inspect_id">
        <TrucksPick @loadPhoto="obj => modalPhoto=obj" @modal1="data1 = true" @modal2="data2 = true" />
        <div class="hr"></div>
        <div class="trucks__draw">
          <TrucksDrawItem title="Driver Signature"/>
          <TrucksDrawItem title="Company representative Signature"/>
          <TrucksDrawItem area="true" title="Comments"/>
        </div>
        <div class="btns">
          <v-btn type="outline">Cancel</v-btn>
          <v-btn >Submit</v-btn>
        </div>
      </template>
    </div>
  </div>
  <ModalCheckList v-if="data1" @close="data1 = false" title="List of in cab devices">
    <CheckListItem :name="item.name" v-for="item in data_modal" />
  </ModalCheckList>
  <ModalCheckList v-if="data2" @close="data2 = false" title="List of externally displayed signs & decals">
    <CheckListItem :name="item.name" v-for="item in data_modal2" />
  </ModalCheckList>
  <ModalLoadPhotos @popupImg="img = true" v-if="modalPhoto" @close="modalPhoto = null" :title="modalPhoto.name">
  </ModalLoadPhotos>
  <PopupPhoto v-if="img" @close="img = false">
    <img src="@/assets/images/tires1.png" alt="">
  </PopupPhoto>
</template>

<script>
import DetailNav from "@/components/app/deatailNav/DetailNav";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import {onMounted, ref} from "vue";
import VSvg from "@/components/ui/vSvg";
import TrucksInfo from "@/components/views/trucks/detail/TrucksInfo";
import VInput from "@/components/ui/vInput";
import TrucksPick from "@/components/views/trucks/detail/TrucksPick";
import TrucksDrawItem from "@/components/views/trucks/detail/TrucksDrawItem";
import VBtn from "@/components/ui/vBtn";
import ModalCheckList from "@/components/app/modals/modal-check-list/ModalCheckList";
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import ModalLoadPhotos from "@/components/app/modals/modal-load-photo/ModalLoadPhotos";
import PopupPhoto from "@/components/app/modals/modal-load-photo/PopupPhoto";
import ModalDraw from "@/components/app/modals/ModalDraw";
import router from "@/router";
import {useRoute, useRouter} from "vue-router";
import {getTruckInspect, getTruckById, truck_by_id, truck_inspect_id} from "@/hooks/truck/useTruck";
import vLoading from "@/components/ui/vLoading";
export default {
  components: {
    ModalDraw,
    PopupPhoto,
    ModalLoadPhotos,
    CheckListItem,
    ModalCheckList,
    VBtn,
    vLoading,
    TrucksDrawItem,
    TrucksPick,
    VInput,
    TrucksInfo,
    VSvg,
    DeatilNavBack,  DetailNav},
  setup(){
    const data1 = ref(false)
    const loading = ref(false)
    const data2 = ref(false)
    const image_draw = ref(false)
    const img = ref(false)
    const inspected_truck = ref(null)
    const modalPhoto = ref(null);
    const data_modal = [
      {name:'Select All'},
      {name:'EZ Pass & Best Pass'},
      {name:'Prepass'},
      {name:'ELD device'},
      {name:'Samsara System (Camera)'},
      {name:'TabletGPS(truck tracking unit)'},
      {name:'APU unit'},
      {name:'Power inverter'},
      {name:'Fridge'},
      {name:'Microwave'},
      {name:'Fire extinguisher'},
      {name:'3 Emergency triangles'},
      {name:'Set of spare fuses'},
      {name:'Truck folder'},
      {name:'Chain'},
    ]

    const data_modal2 = [
      {name:'Select All'},
      {name:'DOT/MC/KYU signs'},
      {name:'Unit Number (displayed on both sides of the truck)'},
      {name:'IFTA (displayed on both sides of the truck)'},
      {name:'HUT (New York state weight & distance permit sticker displayed on the front)'},
      {name:'ELD Sticker'},
      {name:'Licence Plate'},
    ]

    onMounted(async () => {
      loading.value = true
      const  router_id = useRoute().params.id;
      await getTruckById(router_id);
      if(truck_by_id.value?.assigned_driver?.id){
        await getTruckInspect({truck_id:router_id,driver_id:truck_by_id.value.assigned_driver.id})
      }
      loading.value = false
      console.log(inspected_truck.value)
    });

    return{
      data_modal,
      truck_by_id,
      data_modal2,
      modalPhoto,
      image_draw,
      data1,
      data2,
      loading,
      img,
      truck_inspect_id
    }
  }
}
</script>