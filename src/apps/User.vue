<template>
  <div class="flex column">
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Foto do Usuario</span>
    <q-separator/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <q-img width="256px" height="142px" :src="getImgUrl(dadosUser.img)">
        <div class="bg-blue absolute-bottom-right text-subtitle1">
          Atual
        </div>
      </q-img>
      <q-separator vertical/>
      <div class="imgs">
        <q-img v-for="profilePic in profilesPics" style="cursor: pointer" @click="selectPic(profilePic)" width="82px" height="82px" :src="getImgUrl(profilePic)"></q-img>
      </div>
    </div>
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Nome do Usuario</span>
    <q-separator/>
    <div class=" flex row q-pa-md">
      <q-input style="flex: 1" filled outlined v-model="dadosUser.nome"/>
      <q-btn color="primary" @click="setNome" glossy label="salvar"></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import {Vue} from "vue-class-component";

export default class User extends Vue{

  q = useQuasar()
  dadosUser = {img: 'dog.jpg', nome: ''}
  profilesPics = ['dog.jpg', 'carro.jpg', 'bola.jpg', 'frog.jpg', 'girassol.webp', 'horse.jpg', 'pato.jpeg', 'tucano.jpg', 'violao.jpg']

  mounted(){
    const dadosUser = window.localStorage.getItem('winXP_user')
    const dadosUserObj = JSON.parse(dadosUser!)
    this.dadosUser = dadosUserObj
  }

  selectPic(pic: any){
    this.dadosUser.img = pic
    window.localStorage.setItem('winXP_user', JSON.stringify(this.dadosUser))
  }

  setNome(){
    window.localStorage.setItem('winXP_user', JSON.stringify(this.dadosUser))
    this.q.dialog({
      message: 'Alteração feita com sucesso !' })
  }

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }
}
</script>

<style scoped>
.imgs{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
</style>