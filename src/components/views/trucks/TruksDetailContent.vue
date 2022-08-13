<template>
  <vLoading v-if="loading" />
  <div v-else class="section__page trucks">
    <DetailNav>
      <DeatilNavBack :title="truck_by_id?.number || '---'" span="Truck Number:" path="/trucks"/>
    </DetailNav>
    <div class="trucks__content">
      <TrucksInfo />
      <template v-if="data_target">
        <TrucksPick :data_target="data_target" @loadPhoto="obj => modalPhoto=obj" @modal1="data1 = true" @modal2="data2 = true" />
        <div class="hr"></div>
        <div class="trucks__draw">
          <TrucksDrawItem title="Driver Signature"/>
          <TrucksDrawItem title="Company representative Signature"/>
          <TrucksDrawItem area="true" v-model="comment" title="Comments"/>
          <TrucksDrawItem disabled="true" v-for="item in data_target.comments" v-model="item.text" area="true" title="Comments"/>
        </div>
        <div class="btns">
          <v-btn type="outline">Cancel</v-btn>
          <v-btn @click="save">Submit</v-btn>
        </div>
      </template>
    </div>
  </div>
  <ModalCheckList v-if="data1 && form_list_entities && form_list_entities['incab_devices']?.entities?.length"
                  @close="data1 = false" title="List of in cab devices">
    <CheckListItem :name="item.name" :checked="truck_inspect_id.incab_devices.some(e=>e===item.id)" v-for="item in form_list_entities['incab_devices'].entities" />
  </ModalCheckList>
  <ModalCheckList v-if="data2 && form_list_entities && form_list_entities['external_devices']?.entities?.length"
                  @close="data2 = false" title="List of externally displayed signs & decals">
    <CheckListItem :name="item.name" :checked="truck_inspect_id.external_displayed.some(e=>e===item.id)" v-for="item in form_list_entities['external_devices'].entities" />
  </ModalCheckList>
  <ModalLoadPhotos @popupImg="img = true" v-if="modalPhoto" @close="modalPhoto = null" :title="modalPhoto.name"/>
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
import {getTruckInspect, getTruckById, truck_by_id, truck_inspect_id, postInspectTruck} from "@/hooks/truck/useTruck";
import vLoading from "@/components/ui/vLoading";
import {form_list_entities, getFormListEntities} from "@/hooks/form/useForm";
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
    const comment = ref('')
    const modalPhoto = ref(null);
    const data_target = ref({})
    const router_id = useRoute().params.id;

    async function fetchData(){
      if(truck_by_id.value?.assigned_driver?.id){
        await getTruckInspect({truck_id: router_id, driver_id: truck_by_id.value.assigned_driver.id});
        await getFormListEntities({entities: 'incab_devices', limit: 99});
        await getFormListEntities({entities: 'external_devices', limit: 99});
        if(truck_inspect_id.value) {
          data_target.value = Object.assign({}, truck_inspect_id.value);
          data_target.value.truck_id = truck_inspect_id.value.truck.id;
          data_target.value.driver_id = truck_inspect_id.value.truck.assigned_driver.id;
          data_target.value.location = truck_inspect_id.value?.location || 'Tashkent';
          delete data_target.value.truck;
        }
      }
    }

    onMounted(async () => {
      loading.value = true
      await getTruckById(router_id);
      await fetchData();
      loading.value = false
    });

    function save(){
      console.log(comment.value)
      if(comment.value) data_target.value.comments.unshift({created_by: "", text: comment.value, created_at: ""});
      postInspectTruck(data_target.value)
      comment.value = ''
    }

    return{
      data_target,
      form_list_entities,
      truck_by_id,
      modalPhoto,
      image_draw,
      data1,
      data2,
      loading,
      img,
      save,
      comment,
      truck_inspect_id
    }
  }
}
</script>