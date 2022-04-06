<template>
  <div class="bar flex row">
    <div @click="showMenuBar()" id="btnI" class="btnInicar flex row q-pa-sm items-center">
      <img class="logo" src="../assets/windows.png" alt="logo">
      <p class="btnInicarTitle no-margin">Iniciar</p>
    </div>
    <div  class="barItens">
      <div v-if="showAppinBar" @click="maximize()" style="cursor: pointer" class="appsBar flex row items-center">
        <q-img class="logoApp" :src="getImgUrl(iconPrograma)" alt="logo"/>
        <p class="nomeApp no-margin">{{ nomePrograma }}</p>
      </div>
    </div>
    <div class="barOptions flex row q-pa-sm items-center">
      <q-img v-for="item in icones" class="icones" @click="app(item.nome, item.img, sMenuBar = true)" alt="logo" :src="getImgUrl(item.img)">
        <q-tooltip class="bg-white text-black" :offset="[10, 10]">{{ item.tooltip }}</q-tooltip>
      </q-img>
      <p class="hora no-margin">{{ hora }}</p>
    </div>
    <MenuBar @appName="app" v-if="sMenuBar" id="menuBar"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import MenuBar from "@/components/MenuBar.vue";
import {Prop} from "vue-property-decorator";

@Options({components: {MenuBar}})
export default class Bar extends Vue{

  hora = ''
  icones = [{img: 'msn.png', nome: 'MSN', tooltip: '0 mensagens novas no MSN'}, {img: 'defender.png', nome: 'Windows Defender', tooltip: 'O Windows Defender esta desativado'}, {img: 'net.png', nome: 'Redes', tooltip: 'Conexão de rede estavel'}, {img: 'som.png', nome:'Som do sistema', tooltip: 'Som do sistema' }]
  sMenuBar = false

  @Prop() showAppinBar!: boolean
  @Prop() nomePrograma!: string
  @Prop() iconPrograma!: string

  app(nome: any, icon: any, id: any){
    this.$emit('appBar', nome, icon, id)
    this.showMenuBar()
  }

  maximize(){
    this.$emit('maximizeBar')
    setTimeout(()=>{
      const app = document.getElementsByClassName("appsBar");
      Array.prototype.forEach.call(app, function(el) {
        const style = document.createElement('style');
        style.innerHTML = '@keyframes color {\n' +
            '  from {opacity: 1}\n' +
            '  to { opacity: 1}\n' +
            '}'
        el.style.cssText = 'cursor: pointer '
      })
    }, 1001)
  }

  showMenuBar(){
    this.sMenuBar ? this.sMenuBar = false: this.sMenuBar = true;
    const btnI = document.getElementById('btnI');
    this.sMenuBar ? btnI!.style.backgroundColor = '#127912': btnI!.style.backgroundColor = '#429e3c'
  }

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  setTime(){
    const currentdate = new Date();
    let time;
    if(currentdate.getHours().toString().length === 1 && currentdate.getMinutes().toString().length === 1) {
      time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+'0'+currentdate.getHours()+ ":" +'0'+ currentdate.getMinutes() ;
    }
    else if (currentdate.getHours().toString().length === 1){
      time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+'0'+currentdate.getHours()+ ":" + currentdate.getMinutes() ;
    }
    else if(currentdate.getMinutes().toString().length === 1) {
      time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+currentdate.getHours()+ ":" + '0'+currentdate.getMinutes() ;
    }
    else{
      time = currentdate.getDate() + "/" + + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() +'  '+currentdate.getHours()+ ":" + currentdate.getMinutes() ;
    }

    this.hora = time;

    setTimeout(this.setTime, 1000);
  }

  mounted(){
    this.setTime()
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

.bar{
  width: 100%;
  background-color: #2661df;
}
.logo{
  width: 32px;
  height: 32px;
}

.logoApp{
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.appsBar{
  padding: 5px;
  margin: 5px 0 5px 5px;
}

.nomeApp{
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.btnInicar{
  cursor: pointer;
  background-color: #429e3c;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.barItens{
  flex: 1 auto;
}
.appsBar{
  border: solid var(--main-color) ;
  background-color:  var(--main-color);
  width: fit-content;
 }
.btnInicarTitle{
  color: white;
  font-size: 22px;
  padding-left: 2px;
}

.barOptions{
  border-left: black solid 1px;
  background-color: #0f84e1;
  color: white;
}
.hora{
  font-size: 15px;
}
.icones{
  width: 20px;
  height: 20px;
  margin-left: 2px;
  margin-right: 8px;
}
#menuBar{
  position: absolute;
  bottom: 49px;
}
</style>