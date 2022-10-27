<template>
  <v-loading v-if="loading"/>
  <div v-else class="section__page">
    <FilterBar v-model="searchList">
      <div class="my_dropdown-wrapper" v-if="filterDrop" @click="filterDrop = false"></div>
      <div class="my_dropdown" @click.stop="filterDrop=!filterDrop">
        <div class="my_dropdown-content">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4998 9.75V14.25C10.4998 14.4625 10.4279 14.6406 10.2842 14.7844C10.1404 14.9281 9.96232 15 9.74982 15H8.24982C8.03732 15 7.85919 14.9281 7.71544 14.7844C7.57169 14.6406 7.49982 14.4625 7.49982 14.25V9.75L3.14982 4.2C2.96232 3.95 2.93419 3.6875 3.06544 3.4125C3.19669 3.1375 3.42482 3 3.74982 3H14.2498C14.5748 3 14.8029 3.1375 14.9342 3.4125C15.0654 3.6875 15.0373 3.95 14.8498 4.2L10.4998 9.75ZM8.99982 9.825L13.4998 4.125H4.49982L8.99982 9.825Z"/>
          </svg>
          <span class="text-h6">{{ company_id ? form_list_entities['company']?.entities.find(i=>i.id===company_id)?.name : 'All' }}</span>
          <svg :class="filterDrop && 'arrow'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.45 10.525L12.5 15.475C12.4167 15.5583 12.3333 15.6166 12.25 15.65C12.1667 15.6833 12.075 15.7 11.975 15.7C11.875 15.7 11.7833 15.6833 11.7 15.65C11.6167 15.6166 11.5333 15.5583 11.45 15.475L6.475 10.5C6.325 10.35 6.25 10.1708 6.25 9.96245C6.25 9.75412 6.325 9.57495 6.475 9.42495C6.625 9.27495 6.80833 9.20412 7.025 9.21245C7.24167 9.22078 7.425 9.29995 7.575 9.44995L11.975 13.85L16.4 9.42495C16.55 9.27495 16.725 9.19995 16.925 9.19995C17.125 9.19995 17.3 9.27495 17.45 9.42495C17.6 9.57495 17.675 9.75829 17.675 9.97495C17.675 10.1916 17.6 10.375 17.45 10.525Z"/>
          </svg>
        </div>
        <ul class="my_dropdown-drop" v-if="filterDrop">
          <li class="text-h6" @click="company_id = ''" >All</li>
          <li class="text-h6" @click="company_id = company?.id" v-for="company in form_list_entities['company']?.entities" >{{ company.name }}</li>
        </ul>
      </div>
      <v-btn svg="plus" @click="new_driver = true, old_driver = false" v-if="user_permissions?.some(e=>e.alias==='create_driver')">Add driver</v-btn>
    </FilterBar>
    <vTable v-if="driver_list?.drivers" :count="count"
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
                          :col1="{name:i.first_name + ' ' +i.last_name,type:'def',company:i?.company || null}"
                          :col2="{name:i.on_board_date ? i.on_board_date : '--',type:'def'}"
                          :col3="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='hr')[0].percentage * 100).toFixed() : '--' ,type:'progress',
                                  size:(i.department_statistics.filter(e=>e.alias==='hr')[0].percentage * 100).toFixed()>85?'full'
                                  :(i.department_statistics.filter(e=>e.alias==='hr')[0].percentage * 100).toFixed()>25?'half':'null'}"
                          :col4="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='safety')[0].percentage * 100).toFixed() : '--' ,type:'progress',
                                  size:(i.department_statistics.filter(e=>e.alias==='safety')[0].percentage * 100).toFixed()>85?'full'
                                  :(i.department_statistics.filter(e=>e.alias==='safety')[0].percentage * 100).toFixed()>25?'half':'null'}"
                          :col5="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage * 100).toFixed() : '--' ,type:'progress',
                                  size:(i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage * 100).toFixed()>85?'full'
                                  :(i.department_statistics.filter(e=>e.alias==='dipatch_orientation')[0].percentage * 100).toFixed()>25?'half':'null'}"
                          :col6="{name:i.department_statistics ? (i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage * 100).toFixed() : '--' ,type:'progress',
                                  size:(i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage * 100).toFixed()>85?'full'
                                  :(i.department_statistics.filter(e=>e.alias==='fleet')[0].percentage * 100).toFixed()>25?'half':'null'}"
                          :col7="{name:i.col7,type:'def'}"
                          :col8="{name:i.col8,type:'def'}"
                          :col9="{name:i.status.name ? i.status.name : '--',type:'status',size:i.status?.alias==='#processing' ? 'half' : i.status?.alias==='#active' ? 'full' : 'null'}"
        />
      </template>
    </vTable>
    <v-table-none v-else></v-table-none>
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
import {user_permissions} from "@/hooks/user/useUser";
import {all_companys_list, getAllCompanyList} from "@/hooks/company/useCompany";
import {form_list_entities, getFormListEntities} from "@/hooks/form/useForm";
import VTableNone from "@/components/app/table/vTableNone";

export default {
  components: {
    VTableNone,
    VInput, VLoading, ModalAdded, TableBRowDrivers, TableHRowDrivers, TableTool, vTable, VBtn, FilterBar},
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
    let pages = computed(() => (driver_list?.value?.count) ? Math.ceil(driver_list.value.count/limit.value) : 0)
    let company_id = ref('')
    let filterDrop = ref(false)
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
      getDriverList({limit:limit.value,page:page.value,search:a,company_id:company_id.value});
    });
    watch(company_id,(a)=>{
      page.value = 1;
      fetchList()
    });


    function location(id){
      router.push(`/drivers/${id}`)
    }
    async function addNewDriver() {
      v$.value.$touch();
      if(!v$.value.$invalid){
        if(new_driver.value && !old_driver.value)await createDriver(driver.value); else await updateDriverById({id:driver.value.id,data:driver.value});
        await fetchList({type:'limit'})
        driver.value = {};
        new_driver.value = old_driver.value = false;

      }

    }

    async function fetchList(obj){
      loading.value = true;
      if(obj?.type==='limit') page.value = 1
      await getDriverList({limit:limit.value,page:page.value,company_id:company_id.value});
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
       fetchList();
      getFormListEntities({entities: 'company', limit: 99})
    });


    const rules = {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      phone: { required }
    }

    const checked = computed(()=>{
      return driver_list.value?.drivers?.filter(e=>e.checked===true)
    })


    const v$ = useVuelidate(rules, driver);

    return {limit, count, searchList, editDriver, location, checked, fetchList, new_driver, user_permissions,
      old_driver, driver_list,form_list_entities, v$, driver, addNewDriver, page, company_id, pages, loading, data_head, filterDrop};
  }
}
</script>