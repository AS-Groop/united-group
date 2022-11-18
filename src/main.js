import {app} from "@/use";
import './registerServiceWorker'
import store from './store'

app.use(store).mount('#app')
