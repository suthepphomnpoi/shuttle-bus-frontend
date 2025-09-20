import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/style.css'




const app = createApp(App)
app.use(router)
app.use(Toast, { position: "top-right", timeout: 3000 });
app.mount('#app')
