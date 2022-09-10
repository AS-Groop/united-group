<template>
  <v-loading v-if="loading"/>
  <div v-else class="section__page">
    <div class="dashboard__content" v-if="data_dashboard">
      <DashboardCard chart="chart1" title="Drivers" :count="data_dashboard?.driver_statistics?.total || 0" :info="(data_dashboard?.driver_statistics?.growth || 0)">
        <p class="text-h3 text-danger"><span>{{ data_dashboard?.driver_statistics?.pending || 0 }}</span> Pending</p>
        <p class="text-h3 text-info"><span>{{ data_dashboard?.driver_statistics?.in_process || 0 }}</span> Processing</p>
        <p class="text-h3 text-success"><span>{{ data_dashboard?.driver_statistics?.active || 0 }}</span> Active</p>
      </DashboardCard>
      <DashboardCard chart="chart2" type="green" title="Trailers" :count="data_dashboard?.trailer_statistics?.total || 0" :info="(data_dashboard?.trailer_statistics?.growth || 0)">
        <p class="text-h3 text-danger"><span>{{ data_dashboard?.trailer_statistics?.vacant || 0 }}</span> Vacant</p>
        <p class="text-h3 text-info"><span>{{ data_dashboard?.trailer_statistics?.assigned || 0 }}</span> Assigned</p>
        <p class="text-h3 text-success"><span>{{ data_dashboard?.trailer_statistics?.full || 0 }}</span> Full</p>
      </DashboardCard>
      <DashboardCard chart="chart3" type="purple" title="Trucks" :count="data_dashboard?.truck_statistics?.total || 0" :info="(data_dashboard?.truck_statistics?.growth || 0)">
        <p class="text-h3 text-danger"><span>{{ data_dashboard?.truck_statistics?.vacant || 0 }}</span> Vacant</p>
        <p class="text-h3 text-info"><span>{{ data_dashboard?.truck_statistics?.assigned || 0 }}</span> Assigned</p>
        <p class="text-h3 text-success"><span>{{ data_dashboard?.truck_statistics?.full || 0 }}</span> Full</p>
      </DashboardCard>
      <DashboardCard chart="chart4" type="yellow" title="Company cars" :count="data_dashboard?.car_statistics?.total || 0" :info="(data_dashboard?.car_statistics?.growth || 0)">
        <p class="text-h3 text-danger"><span>{{ data_dashboard?.car_statistics?.available || 0 }}</span> Available</p>
        <p class="text-h3 text-success"><span>{{ data_dashboard?.car_statistics?.booked || 0 }}</span> Booked</p>
      </DashboardCard>
    </div>
  </div>
</template>
<script>
import DashboardCard from "@/components/views/dashboard/DashboardCard";
import {computed, onMounted, ref} from "vue";
import VLoading from "@/components/ui/vLoading";
import {get_dashboard, getDashboard} from "@/hooks/auth/useAuth";
export default {
  components: {DashboardCard, VLoading},
  setup(){
    const loading = ref(false)
    const data_dashboard = computed(()=>get_dashboard.value)
    onMounted(async ()=> {
      loading.value = true;
      await getDashboard();
      loading.value = false;
    })
    return{
      data_dashboard,
      loading
    }
  }
}
</script>