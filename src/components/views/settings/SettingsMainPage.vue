<template>
  <div class="section__page">
    <FilterBar>
    </FilterBar>
    <DriversTabMenu
        :index="index"
        @clicks="e=>index=e"
        :tabs_content="['All Users','Roles']"
        class="bb-0"
    />

    <TableUser tabs="tabs" v-if="index === 0" />
    <TableRoles tabs="tabs" v-if="index === 1" />
  </div>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import DriversTabMenu from "@/components/views/drivers/DriversTabMenu";
import {ref} from "vue";
import TableUser from "@/components/views/settings/tables/TableUser";
import TableRoles from "@/components/views/settings/tables/TableRoles";

export default {
  components: {
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


    return{
      index
    }
  }

}
</script>