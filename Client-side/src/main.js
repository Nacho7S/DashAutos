import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login';
import {Cloudinary} from "@cloudinary/url-gen";

import App from './App.vue'
import router from './router'

// import { useToast } from 'vue-toast-notification';
// import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CloudName = 'dmepbhhlw'

const cl = new Cloudinary({cloud:{ cloudName: CloudName }})

const app = createApp(App)

const pinia = createPinia()

app.use(vue3GoogleLogin, {
  clientId: '1077950940461-bbt7hqcpqdgmvsdoop0krjjbvram5927.apps.googleusercontent.com'
});

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.config.globalProperties.$cloudinary = cl

app.use(router)
app.use(pinia)
app.mount('#app')
