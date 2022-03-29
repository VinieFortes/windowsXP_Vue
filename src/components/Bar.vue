<template>
  <div class="bar flex row">
    <div @click="showMenuBar()" id="btnI" class="btnInicar flex row q-pa-sm items-center">
      <img class="logo" src="../assets/windows.png" alt="logo">
      <p class="btnInicarTitle no-margin">Iniciar</p>
    </div>
    <div class="barItens">

    </div>
    <div class="barOptions flex row q-pa-sm items-center">
      <q-img v-for="item in icones" class="icones" alt="logo" :src="getImgUrl(item.img)">
        <q-tooltip class="bg-white text-black" :offset="[10, 10]">{{ item.tooltip }}</q-tooltip>
      </q-img>
      <p class="hora no-margin">{{ hora }}</p>
    </div>
    <MenuBar v-if="sMenuBar" id="menuBar"/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import MenuBar from "@/components/MenuBar.vue";

@Options({components: {MenuBar}})
export default class Bar extends Vue{

  hora = ''
  icones = [{img: 'msn.png', tooltip: '0 mensagens novas no MSN'}, {img: 'defender.png', tooltip: 'O Windows Defender esta desativado'}, {img: 'net.png', tooltip: 'Conexão de rede estavel'}, {img: 'som.png', tooltip: 'Som do sistema' }]
  sMenuBar = false

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
.btnInicar{
  cursor: pointer;
  background-color: #429e3c;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.btnInicarTitle{
  color: white;
  font-size: 22px;
  padding-left: 2px;
}
.barItens{
  flex: 1 auto;
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