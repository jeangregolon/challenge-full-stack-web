import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'
import { VueMaskDirective } from 'v-mask'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Vuelidate)
Vue.directive('mask', VueMaskDirective);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
