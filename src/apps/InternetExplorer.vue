<template>
  <div id="app">
    <iframe :src="source"></iframe>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class InternetExplorer extends Vue{

  source: 'https://www.google.com/' | undefined
}
</script>

<style scoped>

</style>