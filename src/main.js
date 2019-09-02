import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import vueHeadful from 'vue-headful'

Vue.component('vue-headful', vueHeadful)

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
