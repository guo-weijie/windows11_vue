import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt'

const mitter = mitt()

import 'normalize.css/normalize.css'

const app = createApp(App)
app.config.globalProperties.bus = mitter

app.use(store).use(router).mount('#app')
