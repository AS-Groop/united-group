<template>
  <div class="table">
    <div class="table__responsive">
      <table>
        <thead>
        <TableHRowDrivers/>
        </thead>
        <tbody>
        <TableBRowDrivers />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import TableBRowDrivers from "@/components/app/drivers/table/TableBRowDrivers";
import TableHRowDrivers from "@/components/app/drivers/table/TableHRowDrivers";
export default {
  components: {TableHRowDrivers, TableBRowDrivers}
}
</script>