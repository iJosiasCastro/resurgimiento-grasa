import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue Toast
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast, {position: 'bottom'});

// Vue Quill (Wysiwyg editor)
import Quill from 'vue-quill-editor'
Vue.use(Quill)
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css' 

import VueMoment from 'vue-moment'
const moment = require('moment')
require('moment/locale/es')

Vue.use(VueMoment, {
  moment
})

import PortalVue from 'portal-vue'
Vue.use(PortalVue)

import VueRecord from '@codekraft-studio/vue-record'
Vue.use(VueRecord)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
