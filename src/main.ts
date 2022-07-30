import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import store from './store'

import 'normalize.css/normalize.css'
import '@/style/index.css'


createApp(App).use(store).use(router).mount('#app')
