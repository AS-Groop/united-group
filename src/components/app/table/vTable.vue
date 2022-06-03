<template>
  <div class="table" :class="'tabs' && tabs">
    <div class="table__responsive">
      <slot name="tool"></slot>
      <table>
        <thead>
        <slot name="head-row"></slot>
<!--        <TableHRowDrivers/>-->
        </thead>
        <tbody>
        <slot name="body-row"></slot>
<!--        <TableBRowDrivers v-for="i in 15"/>-->
        </tbody>
      </table>
    </div>
    <TableFooter/>
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
  props:['tabs']
};
</script>