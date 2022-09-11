<template>
  <div class="section__page">
    <FilterBar>
<!--      <v-btn svg="plus" @click="new_user = true, modal_edit = null" v-if="index === 0" >Add user</v-btn>-->
    </FilterBar>

    <TableCompany v-if="all_companys_list?.companies" @editRole="id=>$router.push(`/role/${id}`)" @delete="(id)=>modal_delete = id" tabs="tabs"  />
    <vTableNone v-else/>
  </div>

<!--  <ModalAdded v-if="(!new_user && modal_edit) || (new_user && !modal_edit)"-->
<!--              :title="new_user ? 'Add user' : 'Edit user'"-->
<!--              @save="addUser()"-->
<!--              @close="new_user = false, modal_edit = null">-->
<!--    <template v-slot:img>-->
<!--      <div class="img-input">-->
<!--        <input type="file" accept="image/*">-->
<!--        <img v-if="false" src="@/assets/images/no-image.png" alt="">-->
<!--        <v-svg v-else id="loaded-image" width="61" height="60"/>-->
<!--      </div>-->
<!--    </template>-->
<!--    <template v-slot:content>-->
<!--      <v-input v-if="modal_edit" v-model="modal_edit.first_name"  label="Name" place="Enter name"/>-->
<!--      <v-input v-else v-model="modal_add.first_name"  label="Name" place="Enter name"/>-->
<!--      <v-input v-if="modal_edit" v-model="modal_edit.last_name"  label="Last name" place="Enter last name"/>-->
<!--      <v-input v-else v-model="modal_add.last_name"  label="Last name" place="Enter last name"/>-->
<!--      <v-input v-if="modal_edit" v-model="modal_edit.username"  label="Username" place="Enter username"/>-->
<!--      <v-input v-else v-model="modal_add.username"  label="Username" place="Enter username"/>-->
<!--      <v-input v-if="modal_edit" v-model="modal_edit.phone"  label="Phone" place="Enter phone number"/>-->
<!--      <v-input v-else v-model="modal_add.phone"  label="Phone" place="Enter phone number"/>-->
<!--      <v-input v-if="new_user" v-model="modal_add.password"  label="Password" place="Enter password"/>-->
<!--      <v-select v-if="all_roles_list?.roles" :options="all_roles_list.roles" v-model:select="roles" label="Role" place="Choose a role"/>-->
<!--      <v-select v-if="form_list_entities['company']?.entities?.length" :options="form_list_entities['company'].entities" v-model:select="company" label="Company" place="Choose a company"/>-->
<!--    </template>-->
<!--  </ModalAdded>-->
  <ModalDelete v-if="modal_delete" @delete="deleteUser(modal_delete)" @close="modal_delete  =null"/>
  <ModalSuccess v-if="false"/>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import {onMounted, ref, watch} from "vue";
import vTableNone from "@/components/app/table/vTableNone";
import ModalDelete from "@/components/app/modals/ModalDelete";
import ModalSuccess from "@/components/app/modals/ModalSuccess";
import VSvg from "@/components/ui/vSvg";
import {all_companys_list, deleteCompanyById, getAllCompanyList} from "@/hooks/company/useCompany";
import TableCompany from "@/components/views/settings/tables/TableCompany";

export default {
  components: {
    TableCompany,
    VSvg, vTableNone,
    ModalSuccess,
    ModalDelete,  VBtn, FilterBar},
  data() {
    return {
      new_truck:false,
    }
  },
  setup(){
    const index = ref(0);
    const modal_add = ref({
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      company_id: '',
      role_id: ''
    });
    const modal_edit = ref(null);
    const modal_delete = ref(null);


    async function deleteUser(id ){
      await deleteCompanyById(id);
      modal_delete.value =null;
    }




    onMounted(()=>{
      getAllCompanyList();
    })


    return { index,all_companys_list, modal_add, deleteUser,  modal_delete, modal_edit }
  }

}
</script>