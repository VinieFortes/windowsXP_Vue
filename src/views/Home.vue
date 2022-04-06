<template>
  <q-page class="wallpaper flex column" id="home" @click="leftClick">
    <div style="height: 93%; width: 100%; position: absolute" class="drag icones flex column">
      <div id="grid" class="q-pa-sm">
        <div v-for="item in icones" @contextmenu.native="rightClick(item.nome)" :id="item.nome" v-on:dblclick="checkDbclick(item.nome, item.img, item.id)"  class="Icon flex column flex-center">
          <q-img  :width="iconSizeVar" :src="getImgUrl(item.img)"></q-img>
          <span class="texticon text-white">{{ item.nome }}</span>
          <q-menu
              touch-position
              context-menu
          >
            <q-list dense style="min-width: 100px">
              <q-item @click="renomearApp(item.nome, item.img)" clickable v-close-popup>
                <q-item-section>Renomear</q-item-section>
              </q-item>
              <q-item @click="removeApp(item.nome)" clickable v-close-popup>
                <q-item-section>Excluir</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Propriedades</q-item-section>
              </q-item>
            </q-list>

          </q-menu>
        </div>
      </div>
    </div>
    <Bar @appBar="openWindow" @maximizeBar="maximizeFromBar" :show-appin-bar="showAppBar" :icon-programa="iconPrograma"  :nome-programa="nomePrograma" class="bar"></Bar>
    <q-menu
        touch-position
        context-menu
    >
      <q-list dense style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Visualizar</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start">
            <q-list>
              <q-item
                  dense
                  clickable
              >
                <q-item-section @click="iconSize('sm')" >Icones Pequenos</q-item-section>
              </q-item>
              <q-item
                  dense
                  clickable
              >
                <q-item-section @click="iconSize('md')">Icones Medios</q-item-section>
              </q-item>
              <q-item
                  dense
                  clickable
              >
                <q-item-section @click="iconSize('lg')" >Icones Grandes</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
        <q-item clickable>
          <q-item-section>Ordenar por</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start">
            <q-list>
              <q-item
                  dense
                  clickable
              >
                <q-item-section @click="ordemIcons('alf')">Alfabetica</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
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
                  dense
                  clickable
              >
                <q-item-section @click="newFile('pasta')" >Pasta Vazia</q-item-section>
              </q-item>
              <q-item
                  dense
                  clickable
              >
                <q-item-section @click="newFile('file')">Arquivo</q-item-section>
              </q-item>
            </q-list>
          </q-menu>

        </q-item>
        <q-separator />
        <q-item @click="menuClick('Personalizar', 'personalizar')" clickable v-close-popup>
          <q-item-section>Personalizar</q-item-section>
        </q-item>
      </q-list>

    </q-menu>
    <window v-if="showWindow"  @close="showWindow = false; showAppBar = false" @minimaze="minimazeWindow()" @maximize="maximizeWindow()" @dadosFromWall="dadosPersonalizar" :nome-programa="nomePrograma" :icon-programa="iconPrograma" :id-programa="idPrograma" class="window"/>
    <vue-selecto
        :selectableTargets="['.Icon']"
        :hitRate="10"
        :selectByClick="true"
        :continueSelect="true"
        @selectEnd="onSelectEnd"
        dragContainer=".drag"
    />
    <DialogRename v-model="showModal" :icon-app="iconPrograma" :nome-app="nomePrograma" @rename="changeNameApp" />
  </q-page>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Bar from '@/components/Bar.vue';
import {VueSelecto} from "vue3-selecto";
import Window from "@/components/Window.vue";
import DialogRename from "@/components/DialogRename.vue";

@Options({
  components: {DialogRename, VueSelecto, Bar, Window}
})

export default class Home extends Vue {

  showWindow = false
  nomePrograma = ''
  iconPrograma = ''
  idPrograma = ''
  icones = [{img:'lixeira.png', nome: 'Lixeira', id: 'lixeira'}, {img: 'computer.png', nome: 'Meu Computador', id: 'meu_computador'}, {img: 'documentos.png', nome: 'Meus Documentos', id: 'meus_documentos'}, {img: 'explorer.png', nome: 'Internet Explorer', id: 'internet_explorer'}]
  dadosWindows = {}
  showAppBar = false

  showModal = false

  iconSizeVar = '52px'

  onSelectEnd(e: any){
    Array.prototype.forEach.call(e.selected, function(el) {
    if(el.style.backgroundColor === 'rgb(15, 132, 225)'){
      el.style.backgroundColor = null
      el.style.opacity = null
    }else {
      el.style.backgroundColor = 'rgb(15, 132, 225)'
      el.style.opacity = '0.7'
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
      const dados = window.localStorage.getItem('winXP')
      const dadosObjs = JSON.parse(dados!)
      document.body.style.setProperty('--main-color',dadosObjs.color)
    }else {
        this.setWallpaper()
    }
  }

  dadosPersonalizar(){
    this.setWallpaper()
    if(window.localStorage.getItem('winXP')){
      const dados = window.localStorage.getItem('winXP')
      const dadosObjs = JSON.parse(dados!)
      document.body.style.setProperty('--main-color',dadosObjs.color)
    }
  }

  newFile(args: any){
    args === 'pasta' ? this.icones.push({img: 'pasta.png', nome: 'Pasta vazia', id: 'pasta'}) : (args === 'file' ? this.icones.push({img: 'file.png', nome: 'Novo arquivo', id: 'arquivo'}) : null )
  }


  setWallpaper(){
    const wallpaper = document.getElementById('home');
    const dados = window.localStorage.getItem('winXP')
    const dadosObj = JSON.parse(dados!)
    wallpaper!.style.backgroundImage = 'url(' + this.getImgUrl(`${dadosObj.wallpaper}`) + ')';
  }


  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  leftClick(){
  }

  openWindow(nome: string, icon: any, id: any){
    this.showWindow = true
    this.nomePrograma = nome
    this.iconPrograma = icon
    this.idPrograma = id
    this.showAppBar = true
  }

  menuClick(nome: any, id: any){
    this.showWindow = true
    this.nomePrograma = nome
    this.idPrograma = id
    this.iconPrograma = 'computer.png'
    this.showAppBar = true
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

  maximizeFromBar(){
    this.showWindow = true
    const window = document.getElementsByClassName("window");
    Array.prototype.forEach.call(window, function(el) {
      if(el.style.height === '100%' && el.style.width === '100%') {
        el.style.top = '20%'
        el.style.left = '25%'
        el.style.width = '50%'
        el.style.height = '50%'
      }
    })
  }

  minimazeWindow(){
    const window = document.getElementsByClassName("window");
    Array.prototype.forEach.call(window, (el) => {
      const style = document.createElement('style');
      style.innerHTML = '@keyframes mymove\n' +
          '{\n' +
          '  from {transform: translateY(0) translateX(0); opacity: 1; width: 50%; height: 50%}\n' +
          '  to { transform: translateY(500px) translateX(-200px); opacity: 0; width: 1%; height 1%}\n' +
          '}'
      el.style.cssText = 'animation: mymove 1s alternate '
      el.appendChild(style);
    })
    setTimeout(()=>{this.showWindow = false}, 1000)
    setTimeout(()=>{if(!this.showWindow){
      const app = document.getElementsByClassName("appsBar");
      Array.prototype.forEach.call(app, function(el) {
        const style = document.createElement('style');
        style.innerHTML = '@keyframes color {\n' +
            '  from {opacity: 0.3}\n' +
            '  to {background-color: inherit; opacity: 1}\n' +
            '}'
        el.style.cssText = 'animation: color 1s infinite alternate-reverse ease; cursor: pointer '
        el.appendChild(style);
      })
    }}, 1001)

  }

  checkDbclick(nome: any, icon: any, id: any){
    const els = document.getElementsByClassName("Icon");
    let eltoOpen = ''
    Array.prototype.forEach.call(els, function(el) {
      if(nome === el.id){
          eltoOpen = nome
        }
    });
    this.openWindow(eltoOpen, icon, id)
  }

  rightClick(nome: any){
    const els = document.getElementsByClassName("Icon");
    Array.prototype.forEach.call(els, function(el) {
      if(el.id === nome && el.style.backgroundColor === 'rgb(15, 132, 225)'){
        console.log('cond1', nome)
        el.style.backgroundColor = null
        el.style.opacity = null
      }else if (el.id === nome && el.style.backgroundColor !== 'rgb(15, 132, 225)') {
        el.style.backgroundColor = 'rgb(15, 132, 225)'
        el.style.opacity = '0.7'
      }
    })

  }
  renomearApp(nome: any, icon: any){
    this.nomePrograma = nome;
    this.iconPrograma = icon;
    this.showModal = true
  }

  changeNameApp(oldNameApp: string, newNameApp: string){
    this.icones = this.icones.map((item) => {
      item.nome === oldNameApp ? item.nome = newNameApp : null
      return {...item}
    });
    this.showModal = false
  }

  removeApp(nome: any){
    this.icones = this.icones.filter((item) => {
      return item.nome !== nome
    });
  }

  iconSize(size: any){
    size === 'sm' ? this.iconSizeVar = '36px' : (size === 'md' ? this.iconSizeVar = '56px' : this.iconSizeVar = '72px')
  }

  ordemIcons(ordem: any){
    ordem === 'alf' ? this.icones.sort(function(a, b){
      if(a.nome < b.nome) { return -1; }
      if(a.nome > b.nome) { return 1; }
      return 0;
    }) : null
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
  overflow: hidden;
}


#grid{
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(6, auto);
  max-height: 100vh;
  overflow: hidden;
  align-items: start;
  width: fit-content;
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
