<template>
  <div>
    <!--      <template v-for="(item) in items_list">-->
    <div v-for="i in items_list"
         class="drivers__detail-item" @click="$emit('openModal',i.id)">
      <v-my-checked
          @clickCheck="check(i.checked, i.id)"
          :id="i.name" class-name="check" :check="i.checked"/>
      {{ i.name }}
    </div>
    <!--      </template>-->

  </div>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
import router from "@/router";
import {updateStepStatus} from "@/hooks/step/useStep";
import {getDriverById} from "@/hooks/driver/useDriver";
import {static_completed, static_initial} from "@/hooks/app/varables";
import {computed} from "vue";
import VMyChecked from "@/components/ui/vMyChecked";
import {my_steps} from "@/hooks/driver/useStep";

export default {
  components: {VMyChecked, VChecked},
  props: ['name', 'id', 'items', 'finish','tab'],
  setup(props, ctx) {
    const items_list = computed(() => props.items)

    async function check(status_id, step_id) {
      let obj = {
        driver_id: router.currentRoute.value.params.id,
        status_id: status_id ? static_initial : static_completed,
        step_id: step_id
      }
      console.log(obj.status_id + '<==' + status_id)
      await updateStepStatus(obj).then(data => {
        if (data?.data?.ok) {
          my_steps.value[props.tab].find(e => e.id === step_id).checked = !status_id;
        }
      })
      // ctx.emit('updateList')
      // await getDriverById(router.currentRoute.value.params.id)
      // await getDriverById(router.currentRoute.value.params.id)
    }

    return {check, static_completed, static_initial, items_list}
  }
}
</script>