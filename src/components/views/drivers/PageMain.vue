<template>
  <div class="section__page">
    <FilterBar>
      <v-btn type="outline" svg="filter">Add driver</v-btn>
      <v-btn svg="plus">Add driver</v-btn>
    </FilterBar>
<!--    <TableDrivers />-->
  </div>
</template>

<script>
import FilterBar from "@/components/app/FilterBar";
import VBtn from "@/components/ui/vBtn";
import TableDrivers from "@/components/app/drivers/table/TableDrivers";
export default {
  components: {TableDrivers, VBtn, FilterBar}
}
</script>