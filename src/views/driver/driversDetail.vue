<template>
  <div class="section">
    <HeaderDefault />
    <DriversDetailPage/>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversDetailPage from "@/components/views/drivers/DriversDetailPage";
import {onMounted} from "vue";
import {getDriverById} from "@/hooks/driver/useDriver";
import router from "@/router";
export default {
  components: {DriversDetailPage, HeaderDefault},
  setup() {
    onMounted(() => {
      getDriverById(router.currentRoute.value.params.id)
    });

    return{}
  }

}
</script>
