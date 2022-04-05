<template>
  <q-page style="cursor: wait" class="backgroud flex flex-center">
    <div class="second_back flex flex-center q-pa-md">
      <div style="margin-left: 20%" class="flex column">
        <img class="xplogo" src="../assets/xplogo.png" alt="logo">
        <p class="startTitle">{{ texto }}</p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class ShutDownScreen extends Vue{

  textos = ['Fazendo Logoff ...', 'Salvando suas configurações ...', 'Windows está encerrando ...'];
  texto = ''

  mounted(){
    window.sessionStorage.setItem('WinXP_start', '0')
    const sound = ( new Audio( require('@/assets/end.mp3') ).play());
    setTimeout(()=>{this.texto = 'Fazendo Logoff ...'}, 1000)
    setTimeout(()=>{this.texto = 'Salvando suas configurações ...'}, 3000)
    setTimeout(()=>{this.texto = 'Windows está encerrando ...'}, 5000)
    setTimeout(()=>{window.location.href = 'https://github.com/VinieFortes/windowsXP_Vue'}, 7000)
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

.backgroud{
  background-color: #00309c;
}
.second_back{
  background-color: #5a7edc;
  width: 100%;
  position: absolute;
  height: 70%;
  border-top: #ec7531 solid;
  border-bottom: #ec7531 solid;
}
.startTitle{
  color: white;
  padding-top: 12px;
  font-size: 22px;
  text-align: end;
  font-weight: bold;
}
.xplogo{
  width: 162px;
  align-self: end;
}
.user{
  border: yellow 2px solid;
}
.userName{
  color: white;
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
}
.offBtn{
  border: solid 2px;
  background-color: #d30001;
  color: white;
  width: 2px;
  border-radius: 4px;
}
.cardUser{
  cursor: pointer;
}
</style>