<template>
  <q-page class="wallpaper" id="home" @click="leftClick" @contextmenu.native="rightClick($event)">
    <div class="icones flex column q-pa-md">
      <div v-for="item in icones" :id="item.nome" v-on:dblclick="checkDbclick(item.nome, item.img)"  class="Icon flex column flex-center">
        <q-img  width="52px" :src="getImgUrl(item.img)"></q-img>
        <span class="texticon text-white">{{ item.nome }}</span>
      </div>
    </div>
    <Bar @appBar="openWindow" class="bar"></Bar>
    <q-menu
        touch-position
        context-menu
    >
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section>Visualizar</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section>Ordenar por</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Novo</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>

          <q-menu anchor="top end" self="top start">
            <q-list>
              <q-item
                  v-for="n in 3"
                  :key="n"
                  dense
                  clickable
              >
                <q-item-section>Submenu Label</q-item-section>
                <q-item-section side>
                  <q-icon name="keyboard_arrow_right" />
                </q-item-section>
                <q-menu auto-close anchor="top end" self="top start">
                  <q-list>
                    <q-item
                        v-for="n in 3"
                        :key="n"
                        dense
                        clickable
                    >
                      <q-item-section>3rd level Label</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-item>
            </q-list>
          </q-menu>

        </q-item>
        <q-separator />
        <q-item @click="menuClick('Personalizar')" clickable v-close-popup>
          <q-item-section>Personalizar</q-item-section>
        </q-item>
      </q-list>

    </q-menu>
    <window v-if="showWindow" @close="showWindow = false" @maximize="maximizeWindow()" :nome-programa="nomePrograma" :icon-programa="iconPrograma" class="window"/>
    <vue-selecto
        :selectableTargets="['.Icon']"
        :hitRate="10"
        :selectByClick="true"
        :continueSelect="true"
        @selectEnd="onSelectEnd"
    />
  </q-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Bar from '@/components/Bar.vue';
import { VueSelecto } from "vue3-selecto";
import Window from "@/components/Window.vue";

@Options({
  components: {VueSelecto, Bar, Window}
})

export default class Home extends Vue {

  showWindow = false
  nomePrograma = ''
  iconPrograma = ''
  icones = [{img:'lixeira.png', nome: 'Lixeira'}, {img: 'computer.png', nome: 'Meu Computador'}, {img: 'documentos.png', nome: 'Meus Documentos'}, {img: 'explorer.png', nome: 'Internet Explorer'} ]
  dadosWindows = {}

  onSelectEnd(e: any){
    Array.prototype.forEach.call(e.selected, function(el) {
    if(el.style.backgroundColor === 'blue'){
      el.style.backgroundColor = null
    }else {
      el.style.backgroundColor = 'blue'
    }
      e.currentTarget.selectedTargets = []
  })
  }

  mounted(){
    const sound = ( new Audio( require('@/assets/wellcome.mp3') ).play());
    document.addEventListener("contextmenu", function (e){
      e.preventDefault();
    }, false);
    const wallpaper = document.getElementById('home');
    if(!window.localStorage.getItem('winXP')){
      this.dadosWindows = {wallpaper: 'wallpaper.jpg'}
      window.localStorage.setItem('winXP', JSON.stringify(this.dadosWindows))
      wallpaper!.style.backgroundImage = 'url(' + this.getImgUrl('wallpaper.jpg') + ')';
    }else {
        this.setWallpaper()
    }
  }

  setWallpaper(){
    const wallpaper = document.getElementById('home');
    const dados = window.localStorage.getItem('winXP')
    const dadosObj = JSON.parse(dados!)
    wallpaper!.style.backgroundImage = 'url(' + this.getImgUrl(`${dadosObj.wallpaper}`) + ')';
    setTimeout(this.setWallpaper, 1000)
  }


  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  leftClick(){
  }

  openWindow(nome: string, icon: any){
    this.showWindow = true
    this.nomePrograma = nome
    this.iconPrograma = icon
  }

  menuClick(nome: any){
    this.showWindow = true
    this.nomePrograma = nome
    this.iconPrograma = 'computer.png'
  }

  maximizeWindow(){
    const window = document.getElementsByClassName("window");
    Array.prototype.forEach.call(window, function(el) {
      if(el.style.height === '100%' && el.style.width === '100%'){
        el.style.top = '20%'
        el.style.left = '25%'
        el.style.width = '50%'
        el.style.height = '50%'
      }else {
        el.style.top = '0'
        el.style.left = '0'
        el.style.width = '100%'
        el.style.height = '100%'
      }
    })
  }

  checkDbclick(nome: any, icon: any){
    const els = document.getElementsByClassName("Icon");
    let eltoOpen = ''
    Array.prototype.forEach.call(els, function(el) {
      if(nome === el.id){
          eltoOpen = nome
        }
    });
    this.openWindow(eltoOpen, icon)
  }

  rightClick(){

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

#home{
  background-size: cover;
}

.bar{
  position: absolute;
  bottom: 0;
}
.texticon{
  font-size: 12px;
  text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
}
.Icon{
  flex: 1 auto;
  min-width: 100px;
  max-width: 150px;
  margin-top: 25px;
}
.window{
  position: absolute;
  top: 20%;
  left: 25%;
}
</style>
