<template>
  <div class="modal">
    <div class="modal__wrapper" @click="$emit('close')"></div>
    <div class="modal__content modal__drivers">
      <div class="modal__body">
        <div class="title">{{ title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title']

}
</script>