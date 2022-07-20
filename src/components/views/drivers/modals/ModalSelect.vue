<template>
  <div class="modal__item">
    <h2 class="text-h2">{{ name }}</h2>
    <div class="modal__select">
      <RadioSelect v-for="i in 7"/>
    </div>
    <div class="modal__select">
      <div class="modal__select-radio input">
        <input type="text" placeholder="Enter name" >
        <input id="text" type="radio"/>
        <label for="text" class="label"></label>
      </div>
    </div>
  </div>
</template>
<script>
import RadioSelect from "@/components/views/drivers/modals/RadioSelect";
export default {
  props:['name'],
  components: {RadioSelect}
}
</script>