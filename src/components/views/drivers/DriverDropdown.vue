<template>
  <div class="my_dropdown-wrapper" v-if="filterDrop" @click="filterDrop = false"></div>
  <div class="my_dropdown" @click.stop="filterDrop=!filterDrop">
    <div class="my_dropdown-content">
      <svg v-if="filterIcon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.4998 9.75V14.25C10.4998 14.4625 10.4279 14.6406 10.2842 14.7844C10.1404 14.9281 9.96232 15 9.74982 15H8.24982C8.03732 15 7.85919 14.9281 7.71544 14.7844C7.57169 14.6406 7.49982 14.4625 7.49982 14.25V9.75L3.14982 4.2C2.96232 3.95 2.93419 3.6875 3.06544 3.4125C3.19669 3.1375 3.42482 3 3.74982 3H14.2498C14.5748 3 14.8029 3.1375 14.9342 3.4125C15.0654 3.6875 15.0373 3.95 14.8498 4.2L10.4998 9.75ZM8.99982 9.825L13.4998 4.125H4.49982L8.99982 9.825Z"/>
      </svg>
      <span class="text-h6">{{ name }}</span>
      <svg :class="filterDrop && 'arrow'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.45 10.525L12.5 15.475C12.4167 15.5583 12.3333 15.6166 12.25 15.65C12.1667 15.6833 12.075 15.7 11.975 15.7C11.875 15.7 11.7833 15.6833 11.7 15.65C11.6167 15.6166 11.5333 15.5583 11.45 15.475L6.475 10.5C6.325 10.35 6.25 10.1708 6.25 9.96245C6.25 9.75412 6.325 9.57495 6.475 9.42495C6.625 9.27495 6.80833 9.20412 7.025 9.21245C7.24167 9.22078 7.425 9.29995 7.575 9.44995L11.975 13.85L16.4 9.42495C16.55 9.27495 16.725 9.19995 16.925 9.19995C17.125 9.19995 17.3 9.27495 17.45 9.42495C17.6 9.57495 17.675 9.75829 17.675 9.97495C17.675 10.1916 17.6 10.375 17.45 10.525Z"/>
      </svg>
    </div>
    <ul class="my_dropdown-drop" v-if="filterDrop && list.length">
      <li class="text-h6" @click="$emit('clickItem','')" >{{ defaultName || 'All' }}</li>
      <li class="text-h6" @click="$emit('clickItem',item)" v-for="(item,i) in list" :key="i">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps(['name','list','defaultName','filterIcon'])
const emits = defineEmits(["clickItem"])
let filterDrop = ref(false);



</script>