<template>
  <v-loading v-if="loading"/>
  <div v-else class="section__page">
    <FilterBar v-model="searchList">
<!--      <v-btn type="outline" svg="filter" @click="new_driver = false, old_driver = true">Filter</v-btn>-->
      <v-btn svg="plus" @click="new_driver = true, old_driver = false">Add driver</v-btn>
    </FilterBar>
    <vTable :count="count"
            :pages="pages"
            v-model:limit="limit"
            @update:limit="fetchList({type:'limit'})"
            v-model:page="page"
            @update:page="fetchList">
      <template v-slot:tool>
        <TableTool v-if="checked && checked.length === 1" >
          <v-btn type="edit" size="md" @click="editDriver()" v-if="checked.length===1">Edit</v-btn>
<!--          <v-btn type="edit" size="md">Print All Info</v-btn>-->
<!--          <v-btn type="edit" size="md">Print Docs</v-btn>-->
        </TableTool>
      </template>
      <template v-slot:head-row>
        <TableHRowDrivers icon="true" :data="data_head"/>
      </template>
      <template v-slot:body-row>
        <TableBRowDrivers @click="location(i.id)" v-for="(i,index) in driver_list.drivers"
                          v-if="driver_list" v-model:check="i.checked"
                          icon="true" cursor="pointer" :key="i.id" :id="i.id"
                          :col1="{name:i.first_name + ' ' +i.last_name,type:'def'}"
                          :col2="{name:i.on_board_date ? i.on_board_date : '--',type:'def'}"
                          :col3="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='hr')[0].percentage * 100).toFixed() : '--' ,type:'progress',color_rank:i.department_statistics.filter(e=>e.alias==='hr')[0].gradient}"
                          :col4="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='safety')[0].percentage * 100).toFixed() : '--' ,type:'progress',color_rank:i.department_statistics.filter(e=>e.alias==='safety')[0].gradient}"
                          :col5="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage * 100).toFixed() : '--' ,type:'progress',color_rank:i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].gradient}"
                          :col6="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage * 100).toFixed() : '--' ,type:'progress',color_rank:i.department_statistics.filter(e=>e.alias==='fleet')[0].gradient}"
                          :col7="{name:i.col7,type:'def'}"
                          :col8="{name:i.col8,type:'def'}"
                          :col9="{name:i.status.name ? i.status.name : '--',type:'status',size:'full'}"
        />
      </template>
    </vTable>
  </div>
  <ModalAdded :title="new_driver && !old_driver ?'Add driver' : 'Edit driver'" v-if="new_driver || old_driver" @close="new_driver = false, old_driver = false, driver = {}" @save="addNewDriver">
    <template v-slot:img>
<!--      <input type="file" accept="image/*">-->
      <img src="@/assets/images/avatar.svg" alt="">
    </template>
    <template v-slot:content>
      <v-input v-model="driver.first_name" :error="v$.$dirty && v$.first_name.$invalid" label="Name" place="Enter name"/>
      <v-input v-model="driver.last_name" :error="v$.$dirty && v$.last_name.$invalid" label="Last name" place="Enter last name"/>
      <v-input v-model="driver.email" :error="v$.$dirty && v$.email.$invalid" label="Email" place="Enter email address"/>
      <v-input v-model="driver.phone" :error="v$.$dirty && v$.phone.$invalid" label="Phone" place="Enter phone number"/>
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
import {computed, onMounted, ref, watch} from "vue";
import {getDriverList, driver_list, createDriver, updateDriverById} from "@/hooks/driver/useDriver"
import router from "@/router";
import VInput from "@/components/ui/vInput";
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import VLoading from "@/components/ui/vLoading";

export default {
  components: {VInput, VLoading, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
  methods:{
    test(val){
      console.log('update pageNumber in main page',driver_list.value.drivers[0].checked, val)
    }
  },
  setup() {
    const new_driver = ref(false);
    const old_driver = ref(false);
    let page = ref(1);
    let limit = ref(10);
    let loading = ref(false);
    let count = computed(() => (driver_list?.value?.count) ? driver_list.value.count : 0);
    let pages = computed(() => (driver_list?.value?.count) ? Math.ceil(driver_list.value.count/limit.value) : 0);
    const driver = ref({
      email: "",
      first_name: "",
      image_id: "",
      last_name: "",
      phone: ""
    });
    const data_head=[
      {name:'Driver Name'},
      {name:'Date On Board'},
      {name:'Human Resources'},
      {name:'Safety'},
      {name:'Dispatch Orientation'},
      {name:'Fleet'},
      {name:'Assigned Truck'},
      {name:'Assigned Trailer'},
      {name:'Status'},
    ];
    const searchList = ref("");
    watch(searchList,(a)=>{
      page.value = 1;
      getDriverList({limit:limit.value,page:page.value,search:a});
    });


    function location(id){
      router.push(`/drivers/${id}`)
    }
    async function addNewDriver() {
      v$.value.$touch();
      if(!v$.value.$invalid){
        if(new_driver && !old_driver)await createDriver(driver.value); else await updateDriverById({id:driver.value.id,data:driver.value});

        await getDriverList();
        driver.value = {};
        new_driver.value = old_driver.value = false;

      }

    }

    async function fetchList(obj){
      loading.value = true;
      if(obj?.type==='limit') page.value = 1
      await getDriverList({limit:limit.value,page:page.value});
      loading.value = false;
    }

    function editDriver(){
      new_driver.value = false;
      old_driver.value = true;
      driver_list.value.drivers.forEach(e=> {
        if(e.checked)driver.value = e
      })
    }

    onMounted(() => {
       fetchList()
    });


    const rules = {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      phone: { required }
    }

    const checked = computed(()=>{
      return driver_list.value?.drivers.filter(e=>e.checked===true)
    })


    const v$ = useVuelidate(rules, driver);


    return {limit, count, searchList, editDriver, location, checked, fetchList, new_driver, old_driver, driver_list, v$, driver, addNewDriver, page, pages, loading, data_head};
  }
}
</script>