<template>
  <div class="flex column">
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Papel de Parede</span>
    <q-separator/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <q-img width="256px" height="142px" :src="getImgUrl(dadosObj.wallpaper)">
        <div class="bg-blue absolute-bottom-right text-subtitle1">
          Atual
        </div>
      </q-img>
      <q-separator vertical/>
      <div class="flex row q-gutter-x-sm">
        <q-img v-for="wallpaper in wallpapers" style="cursor: pointer" @click="selectWallpaper(wallpaper)" width="82px" height="82px" :src="getImgUrl(wallpaper)"></q-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
export default class  Personalizar extends Vue{

  dadosObj = {}
  wallpapers = ['wallpaper.jpg', 'wallpaper2.jpg', 'wallpaper3.jpg', 'wallpaper4.jpg']

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  selectWallpaper(wall: any){
    this.dadosObj = {wallpaper: wall}
    window.localStorage.setItem('winXP', JSON.stringify(this.dadosObj))
    this.$emit('setWallpaper')
  }

  beforeMount(){
    const dados = window.localStorage.getItem('winXP');
    this.dadosObj = JSON.parse(dados!)
  }


}
</script>

<style scoped>

</style>