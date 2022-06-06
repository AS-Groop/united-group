import {createApp} from 'vue'
import App from '../App.vue'
import router from "@/router";
import "@/assets/style/index.scss";
import Components from "@/components/ui/index"

const app = createApp(App);


/// icons
// import './icons'


/// Ui Components
Components.forEach(component => {
app.component(component.name, component)
});


/// i18n

import i18n from '../i18n'
app.use(i18n)



/// Router
app.use(router)


/// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = 'https://internal.lhbrokerage.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
console.log(process.env.VUE_API_URL)
app.use(VueAxios, axios);



export {app}