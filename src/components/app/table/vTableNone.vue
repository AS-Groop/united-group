<template>
  <div class="table">
    <div class="table__responsive table__responsive-not">
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
  name: 'vTable',
  components: {VBtn, TableTool, TableFooter, TableHRowDrivers, TableBRowDrivers},
  props:['tabs','page','pages', 'limit', 'count']
};
</script>