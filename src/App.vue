<template>
  <q-layout>
    <router-view/>
  </q-layout>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

export default class App extends Vue{

  dadosUser = {img: 'dog.jpg', nome: 'Administrador'}

  beforeMount(){
    document.title = 'Windows - XP'

    if(!window.localStorage.getItem('winXP_user')){
      window.localStorage.setItem('winXP_user', JSON.stringify(this.dadosUser))
    }

    if(window.sessionStorage.getItem('WinXP_start') === '1'){
      this.$router.push('/login')
    }else {
      this.$router.push('/startup')
    }

  }


}
</script>

<style>
:root {
  --main-color: #0054e4;
}
</style>