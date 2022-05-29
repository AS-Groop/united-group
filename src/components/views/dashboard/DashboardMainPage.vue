<template>
  <div class="section__page">
    <div class="dashboard__content">
      <DashboardCard chart="chart1" title="Drivers" count="450" info="3%">
        <p class="text-h3 text-danger"><span>13</span> Pending</p>
        <p class="text-h3 text-info"><span>4</span> Processing</p>
        <p class="text-h3 text-success"><span>433</span> Active</p>
      </DashboardCard>
      <DashboardCard chart="chart2" type="green" title="Drivers" count="450" info="3%">
        <p class="text-h3 text-danger"><span>13</span> Pending</p>
        <p class="text-h3 text-info"><span>4</span> Processing</p>
        <p class="text-h3 text-success"><span>433</span> Active</p>
      </DashboardCard>
      <DashboardCard chart="chart3" type="purple" title="Drivers" count="450" info="3%">
        <p class="text-h3 text-danger"><span>13</span> Pending</p>
        <p class="text-h3 text-info"><span>4</span> Processing</p>
        <p class="text-h3 text-success"><span>433</span> Active</p>
      </DashboardCard>
      <DashboardCard chart="chart4" type="yellow" title="Drivers" count="450" info="3%">
        <p class="text-h3 text-danger"><span>13</span> Pending</p>
        <p class="text-h3 text-info"><span>4</span> Processing</p>
        <p class="text-h3 text-success"><span>433</span> Active</p>
      </DashboardCard>
    </div>
  </div>
</template>
<script>
import DashboardCard from "@/components/views/dashboard/DashboardCard";
export default {
  components: {DashboardCard},
  setup(){
  }
}
</script>