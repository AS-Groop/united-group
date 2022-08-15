<template>
  <vLoading v-if="loading" />
  <div v-else  class="section__page trucks">
    <DetailNav>
      <DeatilNavBack :title="trailer_by_id?.number || '---'" title="#120" span="Trailers Number:" path="/trailers"/>
    </DetailNav>
    <div class="trucks__content">
      <TrailersInfo/>
      <template v-if="data_target">
        <TrailersPick :data_target="data_target" :validate="validate" @loadPhoto="obj => modalPhoto=obj" @modal1="data1 = true" />
        <div class="hr"></div>
        <div class="trucks__draw">
<!--          <TrailersDrawItem title="Driver Signature"/>-->
<!--          <TrailersDrawItem title="Company representative Signature"/>-->
<!--          <TrailersDrawItem area="true" title="Comments"/>-->
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
  <ModalCheckList v-if="data1 && form_list_entities && form_list_entities['need_repair_devices']?.entities?.length"
                  @close="data1 = false" title="Check items needing repair">
    <CheckListItem @onChange="val=>checkList(val,item.id,'need_repair_devices')" :name="item.name" :checked="data_target && data_target.need_repair_devices ? data_target.need_repair_devices.some(e=>e===item.id) : false" v-for="item in form_list_entities['need_repair_devices'].entities" />
  </ModalCheckList>
  <ModalLoadPhotos @popupImg="val=>img=val" v-if="modalPhoto" @close="modalPhoto = null" v-model:data_target="data_target" :data="modalPhoto"/>
  <PopupPhoto v-if="img" @close="img = ''">
    <img :src="img" alt="">
  </PopupPhoto>
</template>

<script>
import vLoading from "@/components/ui/vLoading";
import DetailNav from "@/components/app/deatailNav/DetailNav";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import ModalCheckList from "@/components/app/modals/modal-check-list/ModalCheckList";
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import {ref,onMounted} from "vue";
import VSvg from "@/components/ui/vSvg";
import VInput from "@/components/ui/vInput";
import VBtn from "@/components/ui/vBtn";
import TrailersInfo from "@/components/views/trailers/detail/TrailersInfo";
import TrailersPick from "@/components/views/trailers/detail/TrailersPick";
import TrailersDrawItem from "@/components/views/trailers/detail/TrailersDrawItem";
import {useRoute} from "vue-router";
import {getTruckById, getTruckInspect, postInspectTruck, truck_by_id, truck_inspect_id} from "@/hooks/truck/useTruck";
import {form_list_entities, getFormListEntities} from "@/hooks/form/useForm";
import toast from "@/use/toast";
import {
  getTrailerById,
  getTrailerInspect,
  postInspectTrailer,
  trailer_by_id,
  trailer_inspect_id
} from "@/hooks/trailer/useTrailer";
import TrucksDrawItem from "@/components/views/trucks/detail/TrucksDrawItem";
import ModalLoadPhotos from "@/components/app/modals/modal-load-photo/ModalLoadPhotos";
import PopupPhoto from "@/components/app/modals/modal-load-photo/PopupPhoto";
export default {
  components: {
    TrailersDrawItem,
    TrailersPick,ModalLoadPhotos,
    TrailersInfo,TrucksDrawItem,
    VBtn,vLoading,ModalCheckList,
    VInput,CheckListItem,
    VSvg,PopupPhoto,
    DeatilNavBack,  DetailNav
  },
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
      if(trailer_by_id.value?.assigned_driver?.id){
        await getTrailerInspect({trailer_id: router_id, driver_id: trailer_by_id.value.assigned_driver.id});
        await getFormListEntities({entities: 'need_repair_devices', limit: 99});
        if(trailer_by_id.value) {
          data_target.value = Object.assign({}, trailer_inspect_id.value);
          data_target.value.trailer_id = trailer_inspect_id.value.trailer.id;
          data_target.value.driver_id = trailer_inspect_id.value.trailer.assigned_driver.id;
          data_target.value.location = trailer_inspect_id.value?.location || '';
          delete data_target.value.trailer;
        }
      }
    }

    onMounted(async () => {
      loading.value = true
      await getTrailerById(router_id);
      await fetchData();
      loading.value = false
    });
    function fnValidate(){
      if(!data_target.value) return  validate.value = false;
      if(!data_target.value.fuel_level_images) return  validate.value = false;
      if(!data_target.value.comments) return  validate.value = false;
      if(!data_target.value.company_representative_signature_id) return  validate.value = false;
      if(!data_target.value.left_side_images) return  validate.value = false;
      if(!data_target.value.location) return  validate.value = false;
      if(!data_target.value.front_side_images) return  validate.value = false;
      if(!data_target.value.driver_signature_id) return  validate.value = false;
      if(!data_target.value.right_side_images) return  validate.value = false;
      if(!data_target.value.back_side_images) return  validate.value = false;
      if(!data_target.value.in_side_images) return  validate.value = false;
      if(!data_target.value.inspection_type) return  validate.value = false;
      if(!data_target.value.tire_images) return  validate.value = false;
      if(!data_target.value.damage_images) return  validate.value = false;
      if(!data_target.value.need_repair_devices) return  validate.value = false;
      return validate.value = true;

    }

    function save(){
      fnValidate();
      data_target.value.comments = data_target.value.comments || []
      if(comment.value) data_target.value.comments.unshift({created_by: "", text: comment.value, created_at: ""});
      if(validate.value) {
        postInspectTrailer(data_target.value);
        comment.value = '';
      } else {
        toast('400','error')
      }
    }

    return{
      data_target,
      form_list_entities,
      truck_by_id,
      validate,trailer_by_id,
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
      truck_inspect_id
    }
  }
}
</script>