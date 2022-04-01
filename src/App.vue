<template>
  <q-layout>
    <router-view/>
  </q-layout>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

export default class App extends Vue{

  beforeMount(){
    this.$router.push('/login')
  }

}
</script>

<style>

</style>