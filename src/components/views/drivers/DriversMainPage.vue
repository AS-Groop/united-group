<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Filter</v-btn>
      <v-btn svg="plus" @click="new_driver = true">Add driver</v-btn>
    </FilterBar>
    <vTable>
      <template v-slot:tool>
        <TableTool >
          <v-btn type="edit" size="md">Edit</v-btn>
          <v-btn type="edit" size="md">Print All Info</v-btn>
          <v-btn type="edit" size="md">Print Docs</v-btn>
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRowDrivers icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRowDrivers @click="location(i.id)" v-for="(i,index) in driveres.drivers"
                          v-if="driveres"
                          icon="true" cursor="pointer" :key="i.id" :id="i.id"
                          :col1="{name:i.first_name + ' ' +i.last_name,type:'def'}"
                          :col2="{name:i.on_board_date ? i.on_board_date : '--',type:'def'}"
                          :col3="{name:i.department_statistics ? i.department_statistics.filter(e=>e.alias==='hr')[0].percentage : '--' ,type:'progress',size:i.department_statistics.filter(e=>e.alias==='hr')[0].percentage<30 ? 'null' :i.department_statistics.filter(e=>e.alias==='hr')[0].percentage < 70 ? 'half' : 'full'}"
                          :col4="{name:i.department_statistics ? i.department_statistics.filter(e=>e.alias==='safety')[0].percentage : '--' ,type:'progress',size:i.department_statistics.filter(e=>e.alias==='safety')[0].percentage<30 ? 'null' :i.department_statistics.filter(e=>e.alias==='safety')[0].percentage < 70 ? 'half' : 'full'}"
                          :col5="{name:i.department_statistics ? i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage : '--' ,type:'progress',size:i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage<30 ? 'null' :i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage < 70 ? 'half' : 'full'}"
                          :col6="{name:i.department_statistics ? i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage : '--' ,type:'progress',size:i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage<30 ? 'null' :i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage < 70 ? 'half' : 'full'}"
                          :col7="{name:i.col7,type:'def'}"
                          :col8="{name:i.col8,type:'def'}"
                          :col9="{name:i.status.name ? i.status.name : '--',type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>
  <ModalAdded title="Add driver" v-if="new_driver" @close="new_driver = false" @save="addNewDriver">
    <template v-slot:img>
      <input type="file" accept="image/*">
      <img src="@/assets/images/avatar.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="driver.first_name"  label="Name" place="Enter name"/>
      <v-input v-model="driver.last_name"  label="Last name" place="Enter last name"/>
      <v-input v-model="driver.email"  label="Email" place="Enter email address"/>
      <v-input v-model="driver.phone"  label="Phone" place="Enter phone number"/>
    </template>
  </ModalAdded>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import vTable from "@/components/app/table/vTable";
import TableTool from "@/components/app/table/TableTool";
import TableHRowDrivers from "@/components/app/table/TableHRow";
import TableBRowDrivers from "@/components/app/table/TableBRow";
import ModalAdded from "@/components/app/modals/ModalAdded";
import {computed, onMounted, ref} from "vue";
import {getDriverList, driver_list, createDriver} from "@/hooks/driver/useDriver"
import router from "@/router";
import VInput from "@/components/ui/vInput";
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  components: {VInput, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  data(){
    return {
      data_head:[
        {name:'Driver Name'},
        {name:'Date On Board'},
        {name:'Human Resources'},
        {name:'Safety'},
        {name:'Dispatch Orientation'},
        {name:'Fleet'},
        {name:'Assigned Truck'},
        {name:'Assigned Trailer'},
        {name:'Status'},
      ],
    }
  },
  setup() {
    const new_driver = ref(false);
    const driver = ref({
      email: "",
      first_name: "",
      image_id: "",
      last_name: "",
      phone: ""
    })
    const driveres = ref(null)

    
    
    function location(id){
      router.push(`/drivers/${id}`)
    }

    async function addNewDriver() {
      v$.value.$touch();
      if(!v$.value.$invalid){
        await createDriver(driver.value);
        driver.value = {};
        new_driver.value = false
        await getDriverList();
      }

    }

    driveres.value = computed(()=>driver_list.value)

    onMounted(() => {
      getDriverList()
    });


    const rules = {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      phone: { required }
    }

    const v$ = useVuelidate(rules, driver);


    return {location, new_driver,driveres, v$, driver, addNewDriver};
  }
}
</script>