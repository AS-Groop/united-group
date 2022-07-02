import {createApp} from 'vue'
import App from '../App.vue'
import router from "@/router";
import "./toast"
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
// axios.defaults.baseURL = 'https://internal.lhbrokerage.com';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

axios.interceptors.request.use(config => {
    return config
})
axios.interceptors.response.use(config => {
    return config
}, async error => {
    const originalRequest = error.config;
    if (error.response.data.error_code === 400 && error.response.data.error_message === 'error occured while authorization'){
        originalRequest._isRetry = true;
        router.push('/login')
        // const response = await axios.get(`/api/v1/csrf`)
        // axios.defaults.headers.common[response.data.header_name] = response.data.token;
        // return axios.request(originalRequest)
    }
    if (error.response.status === 502 && error.config && !originalRequest._isRetry){
        // document.body.innerHTML = (error.response.data)
    }
})
app.use(VueAxios, axios);



export {app}