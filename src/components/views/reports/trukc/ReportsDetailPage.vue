<template>
  <vLoading v-if="loading" />
  <div v-else class="section__page trucks">
    <DetailNav>
      <DeatilNavBack :title="truck_history_inspect_id?.truck.number || '---'" span="Truck Number:" path="/reports"/>
    </DetailNav>
    <div class="trucks__content">
      <InfoTruckTrailer />
      <template v-if="data_target">
        <TrucksPick :data_target="data_target" :validate="validate" @loadPhoto="obj => modalPhoto=obj" @modal1="data1 = true" @modal2="data2 = true" />
        <div class="hr"></div>
        <div class="trucks__draw">
          <TrucksDrawItem :error="!validate && !data_target.driver_signature_id" v-model:data_target="data_target" id="driver_signature_id" title="Driver Signature"/>
          <TrucksDrawItem :error="!validate && !data_target.company_representative_signature_id" v-model:data_target="data_target" id="company_representative_signature_id" title="Company representative Signature"/>
          <TrucksDrawItem :error="!validate && !data_target.comments" area="true" v-model="comment" title="Comments"/>
          <TrucksDrawItem disabled="true" v-for="item in data_target.comments" v-model="item.text" area="true" title="Comments"/>
        </div>
        <div class="btns">
          <div style="margin-right: auto;">
            <v-btn @click="data_target.inspection_type = 'pickup'" :type="data_target.inspection_type !== 'pickup'?'outline':''">Pick Up</v-btn>
            <v-btn @click="data_target.inspection_type = 'drop-off'" :type="data_target.inspection_type !== 'drop-off'?'outline':''">Drop off</v-btn>
          </div>
          <div>
            <v-btn type="outline" @click="$router.back()">Cancel</v-btn>
            <v-btn @click="save">Save</v-btn>
          </div>

        </div>
      </template>
    </div>
  </div>
  <ModalCheckList v-if="data1 && form_list_entities && form_list_entities['incab_devices']?.entities?.length"
                  @close="data1 = false" title="List of in cab devices">
    <CheckListItem @onChange="val=>checkList(val,item.id,'incab_devices')" :name="item.name" :checked="data_target && data_target.incab_devices ? data_target.incab_devices.some(e=>e===item.id) : false" v-for="item in form_list_entities['incab_devices'].entities" />
  </ModalCheckList>
  <ModalCheckList v-if="data2 && form_list_entities && form_list_entities['external_devices']?.entities?.length"
                  @close="data2 = false" title="List of externally displayed signs & decals">
    <CheckListItem @onChange="val=>checkList(val,item.id,'external_displayed')" :name="item.name" :checked="data_target && data_target.external_displayed ? data_target.external_displayed.some(e=>e===item.id) : false" v-for="item in form_list_entities['external_devices'].entities" />
  </ModalCheckList>
  <ModalLoadPhotos @popupImg="val=>img=val" v-if="modalPhoto" @close="modalPhoto = null" v-model:data_target="data_target" :data="modalPhoto"/>
  <PopupPhoto v-if="img" @close="img = ''">
    <img :src="img" alt="">
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
import InfoTruckTrailer from "@/components/views/reports/InfoTruckTrailer";
import {useRoute} from "vue-router";
import { truck_inspect_id} from "@/hooks/truck/useTruck";
import vLoading from "@/components/ui/vLoading";
import {form_list_entities, getFormListEntities} from "@/hooks/form/useForm";
import toast from "@/use/toast";
import {getTruckInspectHistory, truck_history_inspect_id, updateTruckHistoryById} from "@/hooks/truck/useTruckHistory";
export default {
  components: {
    ModalDraw,
    PopupPhoto,
    ModalLoadPhotos,
    CheckListItem,
    ModalCheckList,
    VBtn, InfoTruckTrailer,
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
    const validate = ref(true)
    const img = ref('')
    const comment = ref('')
    const modalPhoto = ref(null);
    const data_target = ref(null);
    const router_id = useRoute().params.id;

    async function fetchData(){
      if(truck_history_inspect_id.value?.truck?.assigned_driver?.id){
        await getTruckInspectHistory( router_id);
        await getFormListEntities({entities: 'incab_devices', limit: 99});
        await getFormListEntities({entities: 'external_devices', limit: 99});
        if(truck_history_inspect_id.value) {
          data_target.value = Object.assign({}, truck_history_inspect_id.value);
          data_target.value.truck_id = truck_history_inspect_id.value.truck.id;
          data_target.value.driver_id = truck_history_inspect_id.value.truck.assigned_driver.id;
          data_target.value.location = truck_history_inspect_id.value?.location || '';
          delete data_target.value.truck;
        }
      }
    }

    onMounted(async () => {
      loading.value = true
      await getTruckInspectHistory(router_id);
      await fetchData();
      loading.value = false
    });
    function fnValidate(){
      if(!data_target.value) return  validate.value = false;
      if(!data_target.value.back_side_images) return  validate.value = false;
      if(!data_target.value.comments) return  validate.value = false;
      if(!data_target.value.company_representative_signature_id) return  validate.value = false;
      if(!data_target.value.damage_images) return  validate.value = false;
      if(!data_target.value.location) return  validate.value = false;
      if(!data_target.value.driver_side_images) return  validate.value = false;
      if(!data_target.value.driver_signature_id) return  validate.value = false;
      if(!data_target.value.external_displayed) return  validate.value = false;
      if(!data_target.value.front_side_images) return  validate.value = false;
      if(!data_target.value.fuel_level_images) return  validate.value = false;
      if(!data_target.value.incab_devices) return  validate.value = false;
      if(!data_target.value.inspection_type) return  validate.value = false;
      if(!data_target.value.odometer_images) return  validate.value = false;
      if(!data_target.value.passenger_side_images) return  validate.value = false;
      if(!data_target.value.tire_images) return  validate.value = false;
      return validate.value = true;

    }

    function save(){
      fnValidate();
      data_target.value.comments = data_target.value.comments || []
      if(comment.value) data_target.value.comments.unshift({created_by: "", text: comment.value, created_at: ""});
      if(validate.value) {
        updateTruckHistoryById({id:router_id, data:data_target.value});
        comment.value = '';
      } else {
        toast('400','error')
      }
    }

    return{
      data_target,
      form_list_entities,
      truck_history_inspect_id,
      validate,
      modalPhoto,
      image_draw,
      data1,
      data2,
      loading,
      img,
      save,
      checkList(a,b,c){
        data_target.value[c] = data_target.value[c] || [];
        data_target.value[c] = data_target.value[c].filter(i=>i!==b)
        if(a)data_target.value[c].push(b);
        console.log(data_target.value[c])
      },
      comment,
    }
  }
}
</script>