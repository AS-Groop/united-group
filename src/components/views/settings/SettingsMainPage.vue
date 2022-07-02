<template>
  <div class="section__page">
    <FilterBar>
      <v-btn svg="plus" @click="new_user = true" v-if="index === 0" >Add user</v-btn>
      <v-btn svg="plus" v-if="index === 1" >Add role</v-btn>
    </FilterBar>
    <DriversTabMenu
        :index="index"
        @clicks="e=>index=e"
        :tabs_content="[{alias:0,name:'All Users'},{alias:1,name:'Roles'}]"
        class="bb-0"
    />

    <TableUser @editUser="(item)=>modal_edit = item" @delete="modal_delete = true" tabs="tabs" v-if="index === 0" />
    <TableRoles tabs="tabs" v-if="index === 1" />
  </div>

  <ModalAdded :title="new_user ? 'Add user' : 'Edit user'" v-if="(!new_user && modal_edit) || new_user" @close="new_user = false, modal_edit = null">
    <template v-slot:img>
      <div class="img-input">
        <input type="file" accept="image/*">
        <img v-if="false" src="@/assets/images/no-image.png" alt="">
        <v-svg v-else id="loaded-image" width="61" height="60"/>
      </div>
    </template>
    <template v-slot:content>
      <v-input v-if="modal_edit" v-model="modal_edit.col1"  label="Name" place="Enter name"/>
      <v-input v-else v-model="modal_add.first_name"  label="Name" place="Enter name"/>
      <v-input v-if="modal_edit" v-model="modal_edit.col2"  label="Last name" place="Enter last name"/>
      <v-input v-else v-model="modal_add.last_name"  label="Last name" place="Enter last name"/>
      <v-input v-if="modal_edit" v-model="modal_edit.col3"  label="Email" place="Enter email address"/>
      <v-input v-else v-model="modal_add.email"  label="Email" place="Enter email address"/>
      <v-input v-if="modal_edit" v-model="modal_edit.col4"  label="Phone" place="Enter phone number"/>
      <v-input v-else v-model="modal_add.phone"  label="Phone" place="Enter phone number"/>
      <v-select  label="Role" place="Choose a role"/>
    </template>
  </ModalAdded>
  <ModalDelete v-if="modal_delete" @close="modal_delete = false"/>
  <ModalSuccess v-if="false"/>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import {ref} from "vue";
import TableUser from "@/components/views/settings/tables/TableUser";
import TableRoles from "@/components/views/settings/tables/TableRoles";
import ModalAdded from "@/components/app/modals/ModalAdded";
import VInput from "@/components/ui/vInput";
import VSelect from "@/components/ui/vSelect";
import ModalDelete from "@/components/app/modals/ModalDelete";
import ModalSuccess from "@/components/app/modals/ModalSuccess";
import VSvg from "@/components/ui/vSvg";

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
      email: '',
      phone: '',
      role: {name: 'HR'}
    });
    const modal_edit = ref(null);
    const new_user = ref(false);
    const modal_delete = ref(false);


    return { index, modal_add, new_user, modal_delete, modal_edit }
  }

}
</script>