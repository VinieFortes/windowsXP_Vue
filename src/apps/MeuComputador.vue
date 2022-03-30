<template>
  <div class="flex column">
    <span style="align-self: start; font-weight: bold" class="q-pa-sm">Arquivos armazenados nesse computador</span>
    <q-separator/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <div v-for="pasta of pastas" class="q-gutter-x-sm">
        <q-img  width="56px" :src="getImgUrl('pasta.png')"></q-img>
        <span>{{pasta}}</span>
      </div>
    </div>
    <span style="align-self: start; font-weight: bold" class="q-pa-sm" >Discos Fisicos Locais</span>
    <q-separator/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <div v-for="disco of discos" class="q-gutter-x-sm">
        <q-img  width="56px" :src="getImgUrl('disco.png')"></q-img>
        <span>{{disco}}</span>
      </div>
    </div>
    <span style="align-self: start; font-weight: bold" class="q-pa-sm" >Dispositivos com armazenamento removivel</span>
    <q-separator/>
    <div class="flex q-pa-sm row q-gutter-x-md">
      <div v-for="remove of removeble" class="q-gutter-x-sm">
        <q-img  width="56px" :src="getImgUrl(remove.img)"></q-img>
        <span>{{remove.txt}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class  MeuComputador extends Vue{

  pastas = ['Documentos Compartilhados', 'Documentos do Usuario', 'Documentos da Rede']
  discos = ['Disco Local (C:)']
  removeble = [{img: 'cd.png', txt: 'Unidade de CD/DVD'}, {img: 'floppy.png', txt: 'Unidade Floppy'}]

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }
}
</script>

<style scoped>

</style>