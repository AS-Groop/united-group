<template>
  <div class="section__page">
    <FilterBar>
      <v-btn svg="plus" @click="new_user = true, modal_edit = null" v-if="index === 0" >Add user</v-btn>
      <v-btn svg="plus" v-if="index === 1" @click="$router.push('/role')" >Add role</v-btn>
    </FilterBar>
    <DriversTabMenu
        :index="index"
        @clicks="e=>index=e"
        :tabs_content="[{alias:0,name:'All Users'},{alias:1,name:'Roles'}]"
        class="bb-0"
    />

    <TableUser @editUser="(item)=>{modal_edit = item; roles = item.role; company = item.company?.id ? item.company : null;}"
               @delete="(id)=>modal_delete = id" tabs="tabs" v-if="index === 0" />
    <TableRoles @editRole="id=>$router.push(`/role/${id}`)" @delete="(id)=>modal_delete_role = id" tabs="tabs" v-if="index === 1" />
  </div>

  <ModalAdded v-if="(!new_user && modal_edit) || (new_user && !modal_edit)"
              :title="new_user ? 'Add user' : 'Edit user'"
              @save="addUser()"
              @close="new_user = false, modal_edit = null">
    <template v-slot:img>
      <div class="img-input">
        <input type="file" accept="image/*">
        <img v-if="false" src="@/assets/images/no-image.png" alt="">
        <v-svg v-else id="loaded-image" width="61" height="60"/>
      </div>
    </template>
    <template v-slot:content>
      <v-input v-if="modal_edit" v-model="modal_edit.first_name"  label="Name" place="Enter name"/>
      <v-input v-else v-model="modal_add.first_name"  label="Name" place="Enter name"/>
      <v-input v-if="modal_edit" v-model="modal_edit.last_name"  label="Last name" place="Enter last name"/>
      <v-input v-else v-model="modal_add.last_name"  label="Last name" place="Enter last name"/>
      <v-input v-if="modal_edit" v-model="modal_edit.username"  label="Username" place="Enter username"/>
      <v-input v-else v-model="modal_add.username"  label="Username" place="Enter username"/>
      <v-input v-if="modal_edit" v-model="modal_edit.phone"  label="Phone" place="Enter phone number"/>
      <v-input v-else v-model="modal_add.phone"  label="Phone" place="Enter phone number"/>
      <v-input v-if="new_user" v-model="modal_add.password"  label="Password" place="Enter password"/>
      <v-select v-if="all_roles_list?.roles" :options="all_roles_list.roles" v-model:select="roles" label="Role" place="Choose a role"/>
      <v-select v-if="form_list_entities['company']?.entities?.length" :options="form_list_entities['company'].entities" v-model:select="company" label="Company" place="Choose a company"/>
    </template>
  </ModalAdded>
  <ModalDelete v-if="modal_delete || modal_delete_role" @delete="deleteUser(modal_delete, modal_delete_role)" @close="modal_delete = modal_delete_role =null"/>
  <ModalSuccess v-if="false"/>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import {onMounted, ref, watch} from "vue";
import TableUser from "@/components/views/settings/tables/TableUser";
import TableRoles from "@/components/views/settings/tables/TableRoles";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import VSelect from "@/components/ui/vSelect";
import ModalDelete from "@/components/app/modals/ModalDelete";
import ModalSuccess from "@/components/app/modals/ModalSuccess";
import VSvg from "@/components/ui/vSvg";
import {all_users_list, createUser, deleteUserById, getAllUserList, updateUserById} from "@/hooks/user/useUser";
import {all_roles_list, deleteRoleById, getAllRoleList} from "@/hooks/role/useRole";
import {all_companys_list, getAllCompanyList} from "@/hooks/company/useCompany";
import {form_list_entities, getFormListEntities} from "@/hooks/form/useForm";

export default {
  components: {
    VSvg,
    ModalSuccess,
    ModalDelete,
    VSelect,
    VInput,
    ModalAdded,
    TableRoles,
    TableUser,
    DriversTabMenu,   VBtn, FilterBar},
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
    const roles = ref(null);
    const company = ref(null);
    const new_user = ref(false);
    const modal_delete = ref(null);
    const modal_delete_role = ref(null);

    async function addUser(){
      modal_edit.value.role_id = roles.value.id;
      modal_edit.value.company_id = company.value.id;
      if(new_user.value && !modal_edit.value)await createUser(modal_add.value);
      if(!new_user.value && modal_edit.value)await updateUserById({id:modal_edit.value.id, data: modal_edit.value});
      await getAllUserList();
      new_user.value = false;
      modal_edit.value = null;
      // console.log(modal_add.value)
    }

    async function deleteUser(id , id_role){
      if(modal_delete.value) {
        await deleteUserById(id);
        await getAllUserList();
      }
      if(modal_delete_role.value){
        await deleteRoleById(modal_delete_role.value)
        await getAllRoleList();
      }
      modal_delete.value = modal_delete_role.value =null;
    }



    watch([roles,company],([a,b])=>{
      modal_add.value.role_id = a?.id || '';
      modal_add.value.company_id = b?.id || '';
    })

    onMounted(()=>{
      getAllUserList();
      getAllRoleList();
      getFormListEntities({entities: 'company', limit: 99});
    })


    return { index, modal_delete_role, modal_add, new_user,all_users_list, deleteUser, roles, company, form_list_entities, all_roles_list, addUser, modal_delete, modal_edit }
  }

}
</script>