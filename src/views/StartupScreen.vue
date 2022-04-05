<template>
  <q-page style="cursor: none" class="bg-black flex column flex-center">
    <div class="flex column">
      <img class="xplogo" src="../assets/xplogo.png" alt="logo">
      <q-linear-progress stripe rounded size="20px" indeterminate  color="blue" class="q-mt-lg" />
    </div>
  </q-page>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class StartupScreen extends Vue{

  beforeMount(){
    if(window.sessionStorage.getItem('WinXP_start') === '1') {
      this.$router.push('/login')
    }
  }

  mounted(){
    window.sessionStorage.setItem('WinXP_start', '1')
    setTimeout(()=>{this.$router.push('/login')}, 5000)
  }
}
</script>

<style scoped>
*{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.xplogo{
  width: 224px;
  align-self: end;
}
</style>