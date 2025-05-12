import './assets/main.css'
import "toastify-js/src/toastify.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
