import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import store from './store'

import 'normalize.css/normalize.css'
import '@/style/index.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { myDirective } from '@/directive/index.js'

const app = createApp(App)
myDirective(app)
app.use(store).use(router).mount('#app')
