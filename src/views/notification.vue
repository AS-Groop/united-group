<template>
  <div class="section">
    <HeaderDefault/>
    <div class="section__page notification">
      <DetailNav>
        <DeatilNavBack title="Notification" path="/"/>
      </DetailNav>
      <div class="notification-item head">
        <div class="text-h2-med">Road Test</div>
        <div class="text-h2-med">Road Test</div>
        <div class="text-h2-med">Road Test</div>
      </div>
      <template v-if="notification_list?.notifications">
        <div v-for="i in notification_list.notifications" class="notification-item text-h2-med">
          <div class="notification-text">{{ i.title }}</div>
          <div class="notification-department">{{ i.author }}</div>
          <div class="notification-date">{{ i.created_at }}</div>
        </div>
        <TableFooter
            :count="count"
            :pages="pages"
            v-model:limit="limit" @update:limit="(val)=>{$emit('update:limit',val)}"
            v-model:page="page" @update:page="(val)=>{$emit('update:page',val)}"/>
      </template>

    </div>
  </div>
</template>
<script>
import HeaderDefault from "@/components/app/header/HeaderDefault";
import DriversDetailPage from "@/components/views/drivers/DriversDetailPage";
import {computed, onMounted, ref, watch} from "vue";
import {getDriverById} from "@/hooks/driver/useDriver";
import router from "@/router";
import DeatilNavBack from "@/components/app/deatailNav/DeatilNavBack";
import DetailNav from "@/components/app/deatailNav/DetailNav";
import {getAllNotification, notification_list} from "@/hooks/notification/useNotification";
import TableFooter from "@/components/app/table/TableFooter";

export default {
  components: {TableFooter, DriversDetailPage, HeaderDefault, DeatilNavBack, DetailNav},
  setup() {
    let page = ref(1);
    let limit = ref(10);
    let count = computed(() => (notification_list?.value?.count) ? notification_list.value.count : 0);
    let pages = computed(() => (notification_list?.value?.count) ? Math.ceil(notification_list.value.count / limit.value) : 0);
    onMounted(()=>getAllNotification({page:page.value,limit:limit.value}))
    watch([limit,page],()=>{
      getAllNotification({page:page.value,limit:limit.value})
    })
    return {
      notification_list,
      page,
      limit,
      count,
      pages
    }
  }

}
</script>
