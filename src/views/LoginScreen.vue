<template>
  <q-page class="backgroud flex flex-center">
    <div class="second_back flex flex-center q-pa-md">
      <div class="flex column">
        <img class="xplogo" src="../assets/xplogo.png" alt="logo">
        <p class="startTitle">Para iniciar, selecione o usuário</p>
      </div>
      <q-separator vertical class="q-ml-md q-mr-md bg-white"></q-separator>
      <div class="flex column">
        <div @click="gotoHome" class="cardUser flex row flex-center">
          <q-avatar size="64px" rounded>
            <img class="user" :src="getImgUrl(dadosUser.img)" alt="user">
          </q-avatar>
          <p class="userName">{{ dadosUser.nome }}</p>
        </div>
      </div>
    </div>
    <div class="flex row flex-center" style="position: absolute; bottom: 35px; left: 50px">
      <q-btn @click="$router.push('/shutdown')" class="offBtn" glossy size="11px" icon="power_settings_new"></q-btn>
      <p class="q-pl-sm q-mt-md" style="color: white; font-weight: bold">Desligar</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class LoginScreen extends Vue{

  dadosUser = {img: 'dog.jpg', nome: ''}

  gotoHome(){
    this.$router.push('/')
  }

  mounted(){
    const dadosUser = window.localStorage.getItem('winXP_user')
    const dadosUserObj = JSON.parse(dadosUser!)
    this.dadosUser = dadosUserObj
  }


  getImgUrl(pic: string) {
    return require('../assets/'+pic)
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