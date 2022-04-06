import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {Dialog, Quasar} from 'quasar'
// @ts-ignore
import quasarUserOptions from './quasar-user-options'

const app = createApp(App);
app.use(Quasar, {plugins: {Dialog}}, quasarUserOptions)
app.use(router).mount('#app')

