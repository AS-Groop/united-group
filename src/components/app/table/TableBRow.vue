<template>
  <tr :class="'pointer' && cursor">
    <td @click.stop v-if="icon">
      <v-checked :id="id"/>
    </td>
    <slot name="start"></slot>
    <td v-if="col1">
      <div :class="col1.type==='progress' && 'center'">
        <span v-if="col1.type==='progress'" class="progress-span text-h8" :class="col1.size" >{{col1.name}}</span>
        <span v-if="col1.type==='status'" class="status-btn text-h8" :class="col1.size" >{{col1.name}}</span>
        <template v-if="col1.type==='def'">
          {{col1.name}}
        </template>
      </div>
    </td>
    <td v-if="col2">
      <div :class="col2.type==='progress' && 'center'">
        <span v-if="col2.type==='progress'" class="progress-span text-h8" :class="col2.size" >{{col2.name}}</span>
        <span v-if="col2.type==='status'" class="status-btn text-h8" :class="col2.size" >{{col2.name}}</span>
        <template v-if="col2.type==='def'">
          {{col2.name}}
        </template>
      </div>
    </td>
    <td v-if="col3">
      <div :class="col3.type==='progress' && 'center'">
        <span v-if="col3.type==='progress'" class="progress-span text-h8" :class="col3.size" >{{col3.name}}</span>
        <span v-if="col3.type==='status'" class="status-btn text-h8" :class="col3.size" >{{col3.name}}</span>
        <template v-if="col3.type==='def'">
          {{col3.name}}
        </template>
      </div>
    </td>
    <td v-if="col4">
      <div :class="col4.type==='progress' && 'center'">
        <span v-if="col4.type==='progress'" class="progress-span text-h8" :class="col4.size" >{{col4.name}}</span>
        <span v-if="col4.type==='status'" class="status-btn text-h8" :class="col4.size" >{{col4.name}}</span>
        <template v-if="col4.type==='def'">
          {{col4.name}}
        </template>
      </div>
    </td>
    <td v-if="col5">
      <div :class="col5.type==='progress' && 'center'">
        <span v-if="col5.type==='progress'" class="progress-span text-h8" :class="col5.size" >{{col5.name}}</span>
        <span v-if="col5.type==='status'" class="status-btn text-h8" :class="col5.size" >{{col5.name}}</span>
        <template v-if="col5.type==='def'">
          {{col5.name}}
        </template>
      </div>
    </td>
    <td v-if="col6">
      <div :class="col6.type==='progress' && 'center'">
        <span v-if="col6.type==='progress'" class="progress-span text-h8" :class="col6.size" >{{col6.name}}</span>
        <span v-if="col6.type==='status'" class="status-btn text-h8" :class="col6.size" >{{col6.name}}</span>
        <template v-if="col6.type==='def'">
          {{col6.name}}
        </template>
      </div>
    </td>
    <td v-if="col7">
      <div :class="col7.type==='progress' && 'center'">
        <span v-if="col7.type==='progress'" class="progress-span text-h8" :class="col7.size" >{{col7.name}}</span>
        <span v-if="col7.type==='status'" class="status-btn text-h8" :class="col7.size" >{{col7.name}}</span>
        <template v-if="col7.type==='def'">
          {{col7.name}}
        </template>
      </div>
    </td>
    <td v-if="col8">
      <div :class="col8.type==='progress' && 'center'">
        <span v-if="col8.type==='progress'" class="progress-span text-h8" :class="col8.size" >{{col8.name}}</span>
        <span v-if="col8.type==='status'" class="status-btn text-h8" :class="col8.size" >{{col8.name}}</span>
        <template v-if="col8.type==='def'">
          {{col8.name}}
        </template>
      </div>
    </td>
    <td v-if="col9">
      <div :class="col9.type==='progress' && 'center'">
        <span v-if="col9.type==='progress'" class="progress-span text-h8" :class="col9.size" >{{col9.name}}</span>
        <span v-if="col9.type==='status'" class="status-btn text-h8" :class="col9.size" >{{col9.name}}</span>
        <template v-if="col9.type==='def'">
          {{col9.name}}
        </template>
      </div>
    </td>
    <td v-if="col10">
      <div :class="col10.type==='progress' && 'center'">
        <span v-if="col10.type==='progress'" class="progress-span text-h8" :class="col10.size" >{{col10.name}}</span>
        <span v-if="col10.type==='status'" class="status-btn text-h8" :class="col10.size" >{{col10.name}}</span>
        <template v-if="col10.type==='def'">
          {{col10.name}}
        </template>
      </div>
    </td>

    <slot name="end"></slot>
  </tr>
</template>
<script>
import VChecked from "@/components/ui/vChecked";
export default {
  components: {VChecked},
  props:['icon','id', 'cursor','col1','col2','col3','col4','col5','col6','col7','col8','col9','col10','col11','col12',]
}
</script>