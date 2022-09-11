<template>
  <div class="section__page">
    <div class="detail__nav">
      <div class="detail__nav-back">
        <v-svg @click="$router.back()" id="arrowLeft" width="24" height="24" />
        <span class="text-h3"> Add Role</span>
      </div>
    </div>
    <div class="trucks__content">
      <div class="row">
        <div class="col-6">
          <v-input v-model="data.name" class-name="form__control-md mb-4"  label="Role Name" place="Enter Role Name"/>
          <v-input v-model="data.alias" class-name="form__control-md mb-4"  label="Alias Name" place="Enter Alias "/>
          <v-textarea v-model="data.description" class-name="form__control-md mb-4"  label="Description Name" place="Enter Description"/>
        </div>
      </div>

      <div class="row" v-if="all_role_modules_list?.modules">
        <div class="col-4 role__items">
          <div class="role__item head">Name</div>
          <div class="role__item" @mousemove="select_2 = item.groups, select_3 =null" v-for="item in all_role_modules_list.modules">
            <span>
              <v-checked  :id="item.id" v-model:check="item.check" @update:check="$emit('update:check',item.check)"/>
            {{ item.name }}
            </span>
            <v-svg v-if="item.groups?.length" id="select-arrow"  width="24" height="24"/>
          </div>
        </div>
        <div v-if="select_2?.length" class="col-4 role__items">
          <div class="role__item head">Groups</div>
          <div class="role__item" @mousemove="select_3 = item.permissions" v-for="item in select_2">
            <span>
              <v-checked  :id="item.id" v-model:check="item.check" @update:check="$emit('update:check',item.check)"/>
            {{ item.name }}
            </span>
            <v-svg v-if="item.permissions?.length" id="select-arrow"  width="24" height="24"/>
          </div>
        </div>
        <div v-if="select_3?.length" class="col-4 role__items">
          <div class="role__item head">Permission</div>
          <div class="role__item" v-for="item in select_3">
            <span>
              <v-checked  :id="item.id" v-model:check="item.check" @update:check="checkPermission(item)"/>
            {{ item.name }}
            </span>
          </div>
        </div>
      </div>



      <div class="btns">
        <div>
          <v-btn type="outline" @click="$router.back()">Cancel</v-btn>
          <v-btn @click="save">Save</v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import VSvg from "@/components/ui/vSvg";
import VInput from "@/components/ui/vInput";
import VBtn from "@/components/ui/vBtn";
import VTextarea from "@/components/ui/vTextarea";
import VChecked from "@/components/ui/vChecked";
import {onMounted, ref} from "vue";
import {
  all_role_modules_list,
  createRole,
  getAllRoleModulesList,
  getRoleById,
  role_by_id,
  updateRoleById
} from "@/hooks/role/useRole";
import {useRoute} from "vue-router";
export default {
  components: {
    VTextarea,
    VBtn, VChecked,
    VInput,
    VSvg
  },
  setup(){
    const select_2 = ref(null);
    const select_3 = ref(null);
    const data = ref({
      permissions:[]
    });
    const router_id = useRoute().params.id;

    onMounted(async ()=>{
      await getAllRoleModulesList()
      if(router_id){
        await getRoleById(router_id);
        data.value.alias = role_by_id.value.alias
        data.value.name = role_by_id.value.name
        data.value.description = role_by_id.value.description
      }
    })

    function checkPermission(val){
      data.value.permissions.filter(e=>e!==val.id)
      if(val.check){
        data.value.permissions.push(val.id)
      }
    }

    function save(){
      if(router_id){
        updateRoleById({id:role_by_id.value.id,data:data.value})
      }else{
        createRole(data.value)
      }
    }

    return{all_role_modules_list, save, checkPermission, data, select_2, select_3}
  }
}
</script>