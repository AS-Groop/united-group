<template>
  <div :class="className" @click.stop  class="switches">
<!--    <input type="checkbox" @click.stop="eventd" :checked="check" :id="id">-->
<!--    <label :for="id"></label>-->
    <div class="li" :class="{disable}">
      <input type="checkbox" @click.stop="eventd" :disabled="disable || false" :checked="check" :id="id">
      <label :for="id">
        <span></span>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name:'vToggleDriver',
  props:['id','label', 'className','check','disable'],
  methods:{
    eventd(e){
      // console.log(e.target.checked);
      this.$emit('check',e.target.checked)
    }
  }
}
</script>

<style scoped>
label {
  cursor: pointer;
}

input {
  display: none;
}


.switches .li.disable{
  opacity: 0.4;
}
.switches label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*padding: 15px;*/
}

.switches span:last-child {
  position: relative;
  width: 50px;
  height: 26px;
  border-radius: 15px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
  background:  #c31818;
  transition: all 0.3s;
}

.switches span:last-child::before,
.switches span:last-child::after {
  content: "";
  position: absolute;
}

.switches span:last-child::before {
  left: 1px;
  top: 1px;
  width: 24px;
  height: 24px;
  background: #e8e9ed;
  border-radius: 50%;
  z-index: 1;
  transition: transform 0.3s;
}

.switches span:last-child::after {
  top: 50%;
  right: 6px;
  width: 16px;
  height: 16px;
  transform: translateY(-50%);
  background: url(close_white.svg);
  background-size: 16px 16px;
}

.switches [type="checkbox"]:checked + label span:last-child {
  background: #00d084;
}

.switches [type="checkbox"]:checked + label span:last-child::before {
  transform: translateX(24px);
}

.switches [type="checkbox"]:checked + label span:last-child::after {
  width: 14px;
  height: 14px;
  /*right: auto;*/
  left: 8px;
  background-image: url(done_white.svg);
  background-size: 14px 14px;
}

@media screen and (max-width: 600px) {
  .switches li::before {
    display: none;
  }
}
</style>