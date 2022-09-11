<template>
  <div class="history__item">
    <div class="history__item-text">
      <p class="text-h6"><span>Full name: </span>{{ item.full_name }}</p>
      <p class="text-h6"><span>Key given by: </span>{{ item.key_given_by }}</p>
      <p class="text-h6"><span>Pick up: </span>{{ item.pickup_date }}</p>
    </div>
    <div class="history__item-date text-h6">
      {{ item.created_at }}
    </div>
  </div>
</template>

<script>
export default {
  props:['item'],
  setup(){

  }
}
</script>