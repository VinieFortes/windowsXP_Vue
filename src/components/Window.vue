<template>
  <div style="min-width: 400px" class="one">
    <div class="mydivheader">
      <div class="menuBar flex row justify-between q-gutter-x-lg items-center">
        <div class="q-gutter-x-sm">
          <q-img  width="22px" :src="getImgUrl(iconPrograma)"></q-img>
          <span style="font-weight: bold">{{ nomePrograma }}</span>
        </div>
        <div class="btns q-gutter-x-sm">
          <q-btn class="sizeBtn" glossy size="7px" icon="minimize" @click="minimaze(nomePrograma)"></q-btn>
          <q-btn class="sizeBtn" glossy size="7px" icon="maximize" @click="maximize(nomePrograma)"></q-btn>
          <q-btn class="closeBtn" glossy size="7px" icon="close" @click="close(nomePrograma)"></q-btn>
        </div>
      </div>
    </div>
    <div class="headerMenu flex row justify-between no-wrap">
      <q-btn-group flat>
        <q-btn size="sm" label="Arquivo" icon="article" />
        <q-btn size="sm" label="Editar" icon="edit" />
        <q-btn size="sm" label="Visualizar" icon="visibility" />
        <q-btn size="sm" label="Favorito" icon="star" />
        <q-btn size="sm" label="Ferramentas" icon="construction" />
        <q-btn size="sm" label="Ajuda" icon="help" />
      </q-btn-group>
      <div style="background-color: white" class="q-pa-sm">
        <img alt="logo" width="24" src="../assets/windows.png">
      </div>
    </div>
    <q-separator></q-separator>
    <div class="navBar q-pa-sm flex row justify-start items-center q-gutter-x-sm">
      <div class="q-gutter-x-sm">
        <q-btn size="sm" round color="green" icon="arrow_back"></q-btn>
        <span>Voltar</span>
      </div>
      <div class="q-gutter-x-sm">
        <q-btn size="sm" round color="grey" icon="arrow_forward"></q-btn>
        <span>Voltar</span>
      </div>
      <q-space/>
      <div>
        <q-breadcrumbs>
          <q-breadcrumbs-el label="C:" />
          <q-breadcrumbs-el label="Meus Programas" />
          <q-breadcrumbs-el :label="nomePrograma" />
        </q-breadcrumbs>
      </div>
    </div>
    <Lixeira v-if="idPrograma === 'lixeira'"/>
    <MeuComputador v-if="idPrograma === 'meu_computador'" />
    <Personalizar @setWallpaper="dadosPersonalizacao" v-if="idPrograma === 'personalizar'"/>
    <InternetExplorer v-if="idPrograma === 'internet_explorer'"/>
    <User v-if="nomePrograma === 'Usuario'"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Emit, Prop} from "vue-property-decorator";
import Lixeira from "@/apps/Lixeira.vue";
import MeuComputador from "@/apps/MeuComputador.vue";
import Personalizar from "@/apps/Personalizar.vue";
import InternetExplorer from "@/apps/InternetExplorer.vue";
import User from "@/apps/User.vue";

@Options({
  components: {User, InternetExplorer, Personalizar, MeuComputador, Lixeira},
  component: {}})
export default class Window extends Vue{

  close(app: any){
    this.$emit('close', app, this.indexPrograma)
  }

  maximize(app: any){
    this.$emit('maximize', app, this.indexPrograma)
  }

  minimaze(app: any){
    this.$emit('minimaze', app, this.indexPrograma)
  }

  dadosPersonalizacao(){
    this.$emit('dadosFromWall')
  }

  @Prop()nomePrograma! : string
  @Prop()iconPrograma! : any
  @Prop()idPrograma! : string
  @Prop()indexPrograma! : number

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  dragElement(elmnt: any) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementsByClassName("mydivheader")) {
      elmnt.onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      pos3 = parseInt(e.clientX);
      pos4 = parseInt(e.clientY);
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      return false;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      pos1 = pos3 - parseInt(e.clientX);
      pos2 = pos4 - parseInt(e.clientY);
      pos3 = parseInt(e.clientX);
      pos4 = parseInt(e.clientY);
      elmnt.parentNode.style.top = (elmnt.parentNode.offsetTop - pos2) + "px";
      elmnt.parentNode.style.left = (elmnt.parentNode.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  mounted(){
    const draggableElements = document.getElementsByClassName("mydivheader");
    for(let i = 0; i < draggableElements.length; i++){
      this.dragElement(draggableElements[i]);
    }
  }

}
</script>

<style scoped>

.one {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  text-align: center;
  overflow: auto;
  border: var(--main-color) solid 5px;
  box-shadow: -5px -4px 15px 1px rgba(255,255,255,0.2);
  border-radius: 6px 6px 0 0;
}
.mydivheader {
  padding: 5px;
  cursor: move;
  z-index: 10;
  background-color: var(--main-color);
  color: #fff;
}

.sizeBtn{
  border: solid 2px;
  background-color: #4c7ef3;
  color: white;
  width: 2px;
  border-radius: 4px;
}

.closeBtn{
  border: solid 2px;
  background-color: #d30001;
  color: white;
  width: 2px;
  border-radius: 4px;
}

.headerMenu{
  background-color: #f0eee1;
}
.navBar{
  background-color: #f0eee1;
}
</style>