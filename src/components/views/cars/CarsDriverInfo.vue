<template>
  <div class="content-title text-h3-SBold">Driver Info</div>
  <div class="cars__content-info py-15 mx--15">
    <v-input :disabled="!disabled" v-model="content_car.full_name" :error="validate.$dirty && validate.full_name.$invalid" class-name="form__control-md mb-15 px-15" label="Full name" place="Enter full name"/>
    <v-input :disabled="!disabled" v-model="content_car.key_given_by" :error="validate.$dirty && validate.key_given_by.$invalid" class-name="form__control-md mb-15 px-15" label="Key given by" place="Key given by"/>
    <v-input :disabled="!disabled" v-model="content_car.phone_number" :error="validate.$dirty && validate.phone_number.$invalid" class-name="form__control-md mb-15 px-15" label="Phone" place="Enter phone number"/>
    <v-input :disabled="!disabled" v-model="content_car.location" :error="validate.$dirty && validate.location.$invalid" class-name="form__control-md mb-15 px-15" label="Location" place="Enter Location"/>
    <v-select
        v-if="form_list_entities && form_list_entities['company']?.entities?.length"
        :error="validate.$dirty && validate.company.$invalid"
        class-name="form__control-md mb-15 px-15" :disabled="!disabled"
        label="Company name" place="Company name"
        :options="form_list_entities['company'].entities"
        v-model:select="content_car.company"
    />
    <v-input :disabled="!disabled" v-model="content_car.odometer" :error="validate.$dirty && validate.odometer.$invalid" class-name="form__control-md mb-15 px-15" label="Odometer" place="Enter Odometer"/>
  </div>
</template>
<script>

import VInput from "@/components/ui/vInput";
import VSelect from "@/components/ui/vSelect";
import {ref, watch} from "vue";
import {form_list_entities} from "@/hooks/form/useForm";
import {car_pick_drop} from "@/hooks/car/useCar";

export default {
  components:{VInput, VSelect},
  props:['content_car','validate','disabled'],
  setup(){
    // const content_car = ref({});
    // watch(car_pick_drop,(a,b)=>{
    //   content_car.value = {};
    //   if(car_pick_drop.value){
    //     content_car.value = car_pick_drop.value;
    //   }
    // })
    return { form_list_entities}
  }
}

</script>