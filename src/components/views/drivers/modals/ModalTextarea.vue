<template>
  <div class="modal__item">
    <h2 class="text-h2">Add comments</h2>
    <v-input-modal/>
    <div class="add text-h3">
      <span>Add</span>
    </div>
  </div>
</template>
<script>
import VInputModal from "@/components/ui/vInputModal";
export default {
  components: {VInputModal}
}
</script>