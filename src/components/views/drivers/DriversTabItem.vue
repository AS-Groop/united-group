<template>
  <div>
      <template v-for="(item) in items">
        <div v-for="i in item.steps"
              class="drivers__detail-item" @click="$emit('openModal',i.id)"
             v-if="item.status.alias === 'initial'" >
          <v-checked @clickCheck="check(item.status.id, i.id)" :id="i.name" class-name="check"/>
          {{ i.name }}
        </div>
        <div v-for="i in item.steps"
              class="drivers__detail-item" @click="$emit('openModal',i.id)"
             v-if="item.status.alias === 'completed'" >
          <v-checked @clickCheck="check(item.status.id, i.id)" :id="i.name" class-name="check" :check="true"/>
          {{ i.name }}
        </div>
      </template>

  </div>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
import router from "@/router";
import {updateStepStatus} from "@/hooks/step/useStep";
import {getDriverById} from "@/hooks/driver/useDriver";
export default {
  components: {VChecked},
  props:['name','id','items'],
  setup(){
    async function check(status_id, step_id){
      let obj = {
        driver_id: router.currentRoute.value.params.id,
        status_id: status_id,
        step_id: step_id
      }
      await updateStepStatus(obj)
      await getDriverById(router.currentRoute.value.params.id)
      console.log('test')
    }

    return {check}
  }
}
</script>