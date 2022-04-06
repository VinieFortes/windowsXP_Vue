<template>
  <q-dialog v-model="exibirModal">
    <q-card class="card">
      <q-card-section class="flex column">
        <div class="flex row q-pa-sm q-gutter-x-sm">
          <q-img width="24px" height="24px" :src="getImgUrl(iconApp)"></q-img>
          <p>Renomear {{nomeApp}}</p>
        </div>
        <q-form
            @submit="onSubmit"
            class="q-gutter-md"
        >
        <q-input filled square outlined color="white" dark v-model="newNomeApp"/>
          <div class="q-pa-sm flex justify-end q-gutter-x-sm">
            <q-btn glossy color="primary" type="submit" label="salvar"></q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";
import {Prop, VModel} from "vue-property-decorator";


export default class DialogRename extends Vue {

  @VModel({ type: Boolean }) exibirModal!: boolean
  @Prop() iconApp!: string
  @Prop() nomeApp!: string
  @Prop() idApp!: string

  newNomeApp = ''

  getImgUrl(pic: string) {
    return require('../assets/'+pic)
  }

  onSubmit(){
    this.$emit('rename', this.nomeApp, this.newNomeApp)
  }

}
</script>

<style scoped>
.card{
  background-color: #808080;
}
p{
  color: white;
  font-weight: bold;
}
</style>