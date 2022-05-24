<template>
  <div class="content-title text-h3-SBold">Driver Info</div>
  <div class="cars__content-info py-15 mx--15">
    <v-input class-name="form__control-md mb-15 px-15" label="Full name" place="Enter full name"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Key given by" place="Key given by"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Phone" place="Enter phone number"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Location" place="Enter Location"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Company name" place="Company name"/>
    <v-input class-name="form__control-md mb-15 px-15" label="Odometer" place="Enter Odometer"/>
  </div>
</template>
<script setup>

import VInput from "@/components/ui/vInput";
</script>