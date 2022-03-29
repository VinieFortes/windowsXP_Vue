<template>
  <div style="min-width: 400px" id="mydiv">
    <div id="mydivheader">
      <div class="menuBar flex row justify-between q-gutter-x-lg items-center">
        <div class="q-gutter-x-sm">
          <q-img  width="22px" :src="getImgUrl(iconPrograma)"></q-img>
          <span style="font-weight: bold">{{ nomePrograma }}</span>
        </div>
        <div class="btns q-gutter-x-sm">
          <q-btn class="sizeBtn" glossy size="7px" icon="minimize"></q-btn>
          <q-btn class="sizeBtn" glossy size="7px" icon="maximize" @click="$emit('maximize')"></q-btn>
          <q-btn class="closeBtn" glossy size="7px" icon="close" @click="$emit('close')"></q-btn>
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
    <div>
      <iframe src="https://stackoverflow.com/questions/40760907/open-webpage-inside-the-html-body" title="W3Schools Free Online Web Tutorials">
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Emit, Prop} from "vue-property-decorator";

@Options({component: {}})
export default class Window extends Vue{

  @Emit("close")
  close(){
    return false;
  }

  @Emit("maximize")
  maximize(){
    return false;
  }

  @Prop()nomePrograma! : string
  @Prop()iconPrograma! : any

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  dragElement(elmnt: HTMLElement | null) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt!.id + "header")) {
      document.getElementById(elmnt!.id + "header")!.onmousedown = dragMouseDown;
    } else {
      elmnt!.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt!.style.top = (elmnt!.offsetTop - pos2) + "px";
      elmnt!.style.left = (elmnt!.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  mounted(){
    this.dragElement(document.getElementById("mydiv"));
  }

}
</script>

<style scoped>

#mydiv {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  text-align: center;
  resize: both;
  overflow: auto;
  border: #0054e4 solid 5px;
  border-radius: 10px;
}
#mydivheader {
  padding: 5px;
  cursor: move;
  z-index: 10;
  background-color: #0054e4;
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