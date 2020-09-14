import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/common.less'
import './assets/style/iconfont.less'
import './config/rem'

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

createApp(App).use(store).use(router).mount('#app')
