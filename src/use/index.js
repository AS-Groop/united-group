import {createApp} from 'vue'
import App from '../App.vue'
import router from "@/router";
import "../assets/style/index.scss";
import Components from "@/components/ui/index"

const app = createApp(App);


/// icons
// import './icons'


/// Ui Components
Components.forEach(component => {
app.component(component.name, component)
});

///Lazy
// import VueLazyLoad from 'vue3-lazyload'
// app.use(VueLazyLoad, {
//     loading: require('../assets/images/loading.gif'),
//     error: require('../assets/images/no-image.png'),
// })

/// i18n

import i18n from '../i18n'
app.use(i18n)



/// Router
app.use(router)




export {app}