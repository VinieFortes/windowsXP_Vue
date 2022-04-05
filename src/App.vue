<template>
  <q-layout>
    <router-view/>
  </q-layout>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

export default class App extends Vue{

  beforeMount(){
    if(window.sessionStorage.getItem('WinXP_start') === '1'){
      this.$router.push('/login')
    }else {
      this.$router.push('/startup')
    }

  }

}
</script>

<style>

</style>