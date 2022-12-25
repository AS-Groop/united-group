<template>
  <div class="table">
    <div class="table__responsive table__responsive-not">
      <div class="text-h1">No List</div>
    </div>
  </div>
</template>
<script>
import TableBRowDrivers from "@/components/app/table/TableBRow";
import TableHRowDrivers from "@/components/app/table/TableHRow";
import TableFooter from "@/components/app/table/TableFooter";
import TableTool from "@/components/app/table/TableTool";
import VBtn from "@/components/ui/vBtn";

export default {
  name: 'vTableNone',
  components: {VBtn, TableTool, TableFooter, TableHRowDrivers, TableBRowDrivers},
  props:['tabs','page','pages', 'limit', 'count']
};
</script>