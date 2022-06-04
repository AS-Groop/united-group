<template>
  <div class="content-title text-h3-SBold">Driver Info</div>
  <div class="cars__content-info py-15 mx--15">
    <v-input class-name="form__control-md mb-15 px-15" label="Full name" place="Enter full name"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Key given by" place="Key given by"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Phone" place="Enter phone number"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Location" place="Enter Location"/>
    <v-select
        class-name="form__control-md mb-15 px-15"
        label="Company name" place="Company name"
        :options="options"
        v-model:select="select"
    />
    <v-input class-name="form__control-md mb-15 px-15" label="Odometer" place="Enter Odometer"/>
  </div>
</template>
<script>

import VInput from "@/components/ui/vInput";
import VSelect from "@/components/ui/vSelect";
import {ref, watch} from "vue";

export default {
  components:{VInput, VSelect},

  setup(){
    const options = [
      {id:1,name:'Admin'},
      {id:2,name:'HR'},
      {id:3,name:'Safety'},
      {id:4,name:'Dispatch orientation team\n'},
      {id:5,name:'Fleet'},
      {id:6,name:'Company car users'},
    ];
    const select = ref();
    watch(select,(a,b)=>{
    })
    return {options,select}
  }
}

</script>