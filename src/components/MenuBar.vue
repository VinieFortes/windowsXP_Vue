<template>
  <q-card class="menuBar flex column justify-start items-start">
    <q-card-section style="cursor: pointer" class="q-pa-sm">
      <div @click="runApp('Usuario', 'computer.png')" class="cardUser flex row flex-center">
        <q-avatar size="64px" rounded>
          <img class="user" :src="getImgUrl(dadosUser.img)" alt="logo">
        </q-avatar>
        <p class="userName">{{ dadosUser.nome }}</p>
      </div>
    </q-card-section>
    <q-card-section id="apps" class="no-padding flex row">
      <div id="appsWhite" class="q-pa-sm">
        <div v-for="item in apps" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
          <span class="appName">{{item.nome}}</span>
        </div>
        <q-separator class="q-mb-sm"/>
        <div style="cursor: pointer" class="flex row items-center justify-end">
          <span class="appName">Todos os Programas</span>
          <q-icon color="green-10" size="md" name="arrow_right"></q-icon>
        </div>
      </div>

      <div id="appsBlue" class="q-pa-sm">
        <div v-for="item in appsPasta" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
            <span class="appNameSystem">{{item.nome}}</span>
        </div>
        <q-separator class="q-mb-md"></q-separator>
        <div v-for="item in appsSystem" @click="runApp(item.nome, item.img, item.id)" style="cursor: pointer" class="app flex row items-center q-gutter-x-sm q-pa-sm">
          <q-img  width="32px" :src="getImgUrl(item.img)"></q-img>
          <span class="appNameSystem">{{item.nome}}</span>
        </div>
      </div>
    </q-card-section>
    <q-card-section style="width: 100%" class="flex justify-end items-center">
      <div class="flex row q-gutter-x-md">
        <div class="flex row flex-center">
          <q-btn @click="$router.push('/login')" class="logoffBtn" glossy size="8px" icon="vpn_key"></q-btn>
          <p class="q-pl-sm q-mt-md" style="color: white; font-weight: bold">Fazer Logoff</p>
        </div>
        <div class="flex row flex-center">
          <q-btn @click="$router.push('/shutdown')" class="offBtn" glossy size="8px" icon="power_settings_new"></q-btn>
          <p class="q-pl-sm q-mt-md" style="color: white; font-weight: bold">Desligar</p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Emit} from "vue-property-decorator";

export default class MenuBar extends Vue{

  apps = [{img: 'explorer.png', nome: 'Internet Explorer', id: 'internet_explorer'}, {img: 'email.png', nome: 'E-mail'}, {img: 'media.png', nome: 'Windows Media Player'}, {img: 'firefox.png', nome: 'Mozilla Firefox'}, {img: 'live.png', nome: 'Windows Messenger'}, {img: 'wordpad.png', nome: 'WordPad'}, {img: 'paint.png', nome: 'Paint'}]
  appsPasta = [{img: 'pasta.png', nome: 'Meus Documentos', id: 'meus_documentos'}, {img: 'pasta.png', nome: 'Minhas Imagens'}, {img: 'pasta.png', nome: 'Minhas Musicas'}]
  appsSystem = [{img: 'computer.png', nome: 'Meu Computador', id: 'meu_computador'}, {img: 'net.png', nome: 'Redes'}, {img: 'panel.png', nome: 'Painel de Controle'}]

  dadosUser = {img: 'dog.jpg', nome: ''}

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  runApp(nome: any, img: any, id: any){
    this.$emit('appName', nome, img, id)
  }

  mounted(){
    const dadosUser = window.localStorage.getItem('winXP_user')
    const dadosUserObj = JSON.parse(dadosUser!)
    this.dadosUser = dadosUserObj
  }
}
</script>

<style scoped>
.menuBar{
  background-color: #0f84e1;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  width: 40%;
}
.user{
  border: white 2px solid;
}
.userName{
  color: white;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  font-size: 18px;
}
#apps{
  border-radius: 0;
  box-shadow: -2px 0 5px 2px orange;
  width: 100%;
}
#appsWhite{
  background-color: white;
  width: 50%;
}
#appsBlue{
  background-color: #d1e7f4;
  flex: 1 auto;
}
.app:hover {
  background-color: #0f84e1;
}
.appName{
  font-size: 16px;
  font-weight: bold;
}
.appNameSystem{
  font-size: 16px;
  font-weight: bold;
  color: blue;
}
.logoffBtn{
  border: solid 2px;
  background-color: #f5ca07;
  color: white;
  width: 2px;
  border-radius: 4px;
}
.offBtn{
  border: solid 2px;
  background-color: #d30001;
  color: white;
  width: 2px;
  border-radius: 4px;
}

</style>