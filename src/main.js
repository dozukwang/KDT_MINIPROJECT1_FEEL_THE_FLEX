import { createApp } from 'vue'
import App from '~/App.vue'
import router from '~/routes'
import '~/routes/guards'
import store from '~/store'
import Loader from '~/components/Loader'
import '~/scss/main.scss'
 
const app = createApp(App)
app.use(router)
app.use(store)
app.component('Loader', Loader)
app.mount('#app')
